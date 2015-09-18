import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to CUBE</h1>
        <Link to={`/emails`}>See emails</Link>
      </div>
    );
  }
}
