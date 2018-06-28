import React from 'react';
import styled from 'styled-components';
import { PrimaryText } from '../base_components/sharedComponents';
import LoginForm from '../components/LoginForm';
import Colors from '../../src/constants/colors';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Border = styled.div`
  border-style: solid;
  border-color: ${Colors.lightGrey};
  padding: 2%;
`;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Border>
          <div className="header">
            <PrimaryText size="2em">Restaurant App</PrimaryText>
            <LoginForm />
          </div>
        </Border>
      </Container>
    );
  }
}

export default Home;
