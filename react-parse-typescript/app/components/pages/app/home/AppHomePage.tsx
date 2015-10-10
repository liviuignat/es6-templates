import React from 'react';
import { List, ListItem } from 'material-ui/lib/lists';

export default class extends React.Component<any, any> {
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
          <ListItem primaryText={Layouts} />
          <ListItem primaryText='Languages'/>
        </List>
      </div>
    );
  }
}
