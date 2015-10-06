import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <header>
        <AppBar
          title={<a className='AppHeader-homeLink' href={`/`}>MATERIAL MAILS</a>}
          showMenuIconButton={false}
          iconElementRight={<a className='AppHeader-navigationLink' href={`/auth/login`}>Login</a>} 
          />
      </header>
    );
  }
}
