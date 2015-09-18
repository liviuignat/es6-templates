import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
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
      </li>
    );
  }
}
