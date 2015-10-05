class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>test</div>
  }
}

window.React = React;
const mountNode = window.document.getElementById('app');

React.render(<Demo />, mountNode);
