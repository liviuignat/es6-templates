import React from 'react';
 
import AppHeader from './common/app-header/AppHeader';
import LeftNav from 'material-ui/lib/left-nav';
 
class AppComponent extends React.Component<any, any> {
  
  static contextTypes = {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func
  };
 
  constructor(props, context) {
    super(props, context);
    
    this.menuItems = [
      { route: '/app', text: 'Dashboard' },
      { route: '/app/about', text: 'About' },
      { route: '/app/contact', text: 'Contact' },
    ];
  }
 
  handleClick(e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  }
 
  getSelectedIndex() {
    console.log('AppComponent:', this.context, this.props);
    
    let currentItem;
 
    for (let i = this.menuItems.length - 1; i >= 0; i--) {
      currentItem = this.menuItems[i];
      const isCurrentRoute = 
        this.props.location.pathname === currentItem.route ||
        this.props.location.pathname === currentItem.route + '/';
        
      if (isCurrentRoute) {
        return i;
      }
    }
  }
 
  onLeftNavChange(e, key, payload) {
    this.props.history.pushState(null, payload.route);
  }
 
  render() {
 
    return (
      <div>
 
        <LeftNav
          ref='leftNav'
          docked={false}
          menuItems={this.menuItems}
          selectedIndex={this.getSelectedIndex.bind(this)()}
          onChange={this.onLeftNavChange.bind(this)} />
 
        <AppHeader onLeftIconButtonTouchTap={this.handleClick.bind(this)} />
 
        <section className='AppContainer'>
          {this.props.children}
        </section>
 
      </div>
    );
  }
}
 
export default AppComponent;