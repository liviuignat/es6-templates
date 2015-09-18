import React from 'react';
import { emailStore } from './../../stores/emailStore';
import { emailAction } from './../../actions/emailAction';
import EmailList from './EmailList';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    emailStore.addChangeListener(this.onChange.bind(this));
    emailAction.loadEmails();
  }

  componentWillUnmount() {
    emailStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState(this.getStateFromStore());
  }

  getStateFromStore() {
    return {
      emails: emailStore.getAll()
    };
  }

  render() {
    return (
      <div>
        <h1>These are the emails from CUBE</h1>
        <EmailList emails={this.state.emails} />
      </div>
    );
  }
}
