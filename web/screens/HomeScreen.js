import React from 'react';
import PrimaryText from '../base_components/PrimaryText';
import LoginForm from '../components/LoginForm';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="header">
          <PrimaryText size="2em">Restaurant App</PrimaryText>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Home;
