'use strict';

jest.dontMock('./HomePage');

const React = require('react/addons');
const HomePage = require('./HomePage');
const TestUtils = React.addons.TestUtils;

describe('When Home Page is rendered', function() {
  let home = null;

  beforeEach(function() {
    home = TestUtils.renderIntoDocument(<HomePage/>);
  });

  it('should contain the word Welcome', function() {
    expect(React.findDOMNode(home).textContent).toContain('Welcome');
  });
});
