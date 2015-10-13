import * as React from 'react';
import ComponentBase from './ComponentBase';
import { AppHeader, LeftNav } from './common/index';

class AppComponent extends ComponentBase<any, any> {

  static contextTypes: React.ValidationMap<any> = {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func
  };

  menuItems = [
    { route: '/app', text: 'Dashboard' },
    { route: '/app/about', text: 'About' },
    { route: '/app/contact', text: 'Contact' },
  ];

  constructor(props: any, context: any) {
    super(props, context);
  }

  handleClick(e: any) {
    e.preventDefault();

    const leftNav: any = this.refs['leftNav'];
    leftNav.toggle();
  }

  getSelectedIndex() {
    let currentItem: any;

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

  onLeftNavChange(e: any, key: any, payload: any) {
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