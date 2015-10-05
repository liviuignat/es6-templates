import React from 'react';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    props.text = props.text || 'Press';
  }

  render() {
    return (
      <div>
        <button>{this.props.text}</button>
        <button>Delete</button>
      </div>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    props.emails = [];
  }

  render() {
    return (
      <ul className="EmailList">
        {this.props.emails.map(this.renderListItem)}
      </ul>
    );
  }

  renderListItem(item, index) {
    return (
      <li key={index} className="EmailListItem">
        <div className="EmailListItem-from">{item.from.name}</div>
        <div className="EmailListItem-subject">{item.subject}</div>
        <div className="EmailListItem-date">{item.date}</div>
        <ActionButton text="Reply" />
      </li>
    );
  }
}
