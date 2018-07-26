import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-color: #d9d9d9;
  border-style: solid;
  border-width: 1px;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  padding: 2%;
  display: flex;
  align-items: center;
  margin: 5px;
`;

const CounterText = styled.div`
  text-align: center;
  color: #009900;

`;

class CounterButton extends React.Component {
  state = {
    counter: this.props.quantity || 1,
  }

  decreaseCount = () => {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({
        counter: this.state.counter - 1,
      }, () => this.props.onClick(this.state.counter));
    }
  }

  increaseCount = () => {
    this.setState({
      counter: this.state.counter + 1,
    }, () => this.props.onClick(this.state.counter));
  }

  render() {
    return (
      <Container>
        <Button onClick={this.decreaseCount}>
          <i className="material-icons">remove</i>
        </Button>
        <div>
          <CounterText>{this.state.counter}</CounterText>
        </div>
        <Button onClick={this.increaseCount}>
          <i className="material-icons">add</i>
        </Button>
      </Container>
    );
  }
}

CounterButton.propTypes = {
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CounterButton;
