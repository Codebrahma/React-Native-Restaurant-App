import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../src/constants/colors';

const ButtonContainer = styled.div`  
  width: 40%;
  margin: auto;
  padding: 2%;
  border-radius: 25px;
  border: none;
  background-color: ${props => (props.disabled ? '#ddd' : props.buttonColor || '#000')};
  &:hover{
    cursor: pointer
  }`;

const TextWrapper = styled.div`
  color: ${props => props.color};
  text-align: center;
`;

const Button = ({
  text, textColor, onClick, disabled, buttonColor,
}) => (
  <ButtonContainer buttonColor={buttonColor} disabled={disabled} onClick={onClick}>
    <TextWrapper color={textColor}>
      {text}
    </TextWrapper>
  </ButtonContainer>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  buttonColor: PropTypes.string.isRequired,
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
