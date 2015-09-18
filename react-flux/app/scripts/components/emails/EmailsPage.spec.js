'use strict';

jest.dontMock('./EmailsPage');

const React = require('react/addons');
const EmailsPage = require('./EmailsPage');
const emailStore = require('./../../stores/emailStore');
const TestUtils = React.addons.TestUtils;

describe('When Emails Page is rendered', function() {
  let component = null;

  beforeEach(function() {
    emailStore.getAll = jest.genMockFunction().mockReturnValue();

    component = TestUtils.renderIntoDocument(<EmailsPage/>);
  });

  it('should contain the word CUBE', function() {
    expect(React.findDOMNode(component).textContent).toContain('CUBE');
  });
});
