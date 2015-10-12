import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { List, ListItem } from './../../../common/index';

class AppHomePage extends ComponentBase<any, any> {
  constructor(props: any) {
    super(props);

    this.props.menuStyle = {
       width: '100px',
       marginLeft: '-16px',
       marginTop: '-13px'
    };
  }

  render() {
    return (
      <div>
        <List style={ this.props.menuStyle }>
          <ListItem primaryText='Dashboard' />
          <ListItem primaryText='Layouts' />
          <ListItem primaryText='Languages'/>
        </List>
      </div>
    );
  }
}

export default AppHomePage;
