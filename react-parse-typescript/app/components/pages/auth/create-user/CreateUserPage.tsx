import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';



export default class extends React.Component<any, any> {
  standardActions = [
    { text: 'Cancel' },
    { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
  ];

  constructor(props: any) {
    super(props);
    
    this.state = {
      modal: false,
      openImmediately: false,
      username: ''
    };
  }
  
  openDialog() {
    this.refs.dialog.show();
    console.log(this.state.username);
  }
  
  onUsernameChanged(evt) {
    const value = evt.target.value;
    this.setState({username: value}); 
    console.log(value);
  }

  render() {
    return (
      <div>
        <button onClick={this.openDialog.bind(this)}>Open Dialog</button>
        
        <div>
          <TextField
            value={this.state.username}
            onChange={this.onUsernameChanged.bind(this)}
            type='email'
            hintText='Username'
            floatingLabelText='Please type your username bitch!!!!' />
        </div>
      
        <Dialog
          ref='dialog'
          title='Dialog With Standard Actions'
          actions={this.standardActions}
          actionFocus='submit'
          modal={this.state.modal}
          openImmediately={this.state.openImmediately}>
          Welcome {this.state.username} !
        </Dialog>
      </div>
    );
  }
}
