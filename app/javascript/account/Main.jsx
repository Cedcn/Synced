import React from 'react';
import BaseInfo from './BaseInfo';

class Main extends React.Component {
  state = {
    value: 1
  }
  handleChange = (event, index, value) => this.setState({ value })

  render() {
    return (
      <section>
        <BaseInfo />
      </section>
    );
  }
}

export default Main;
