import React from 'react';
import HomePage from './components/HomePage';

class Demo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>Page header</header>
        <HomePage />
      </div>
    );
  }
}
