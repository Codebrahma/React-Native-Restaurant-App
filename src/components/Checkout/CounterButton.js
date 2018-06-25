/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';


const Container = styled.View`
  flex-direction: row;
  border-color: #d9d9d9;
  border-width: 1px;
  padding: 4%;
  justify-content: space-between;
  align-items: center;
`;

const DecreaseButton = styled.TouchableOpacity`
  padding: 2%;
`;

const IncreaseButton = styled.TouchableOpacity`
  padding: 2%;
`;

const CounterContainer = styled.View`
  padding-horizontal: 10%;
`;

const CounterText = styled.Text`
  text-align: center;
  color: #009900;
  width: 25px;
`;


class CounterButton extends Component {
  state = {
    counter: this.props.qty || 1,
  };

  increaseCount = () => {
    this.setState({
      counter: this.state.counter + 1,
    }, () => this.props.onChange(this.state.counter));
  };

  decreaseCount = () => {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({
        counter: this.state.counter - 1,
      }, () => this.props.onChange(this.state.counter));
    }
  };

  render() {
    return (
      <Container style={this.props.style}>
        <DecreaseButton onPress={this.decreaseCount}>
          <Ionicons name="md-remove" size={15} color="#666666" />
        </DecreaseButton>
        <CounterContainer>
          <CounterText>{this.state.counter}</CounterText>
        </CounterContainer>
        <IncreaseButton onPress={this.increaseCount}>
          <Ionicons name="md-add" size={15} color="#009900" />
        </IncreaseButton>
      </Container>
    );
  }
}

CounterButton.defaultProps = {
  style: {},
};


CounterButton.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};


export default CounterButton;
