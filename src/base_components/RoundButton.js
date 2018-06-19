import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../constants/colors';

const ButtonWrap = styled.View`
  background-color: ${props => props.buttonColor || '#000'};
  margin: 10px auto;
  width: 90%;
  padding: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 80;
  elevation: 3;
`;

const ButtonText = styled.Text`
  font-family: 'Roboto Slab';
  color: ${props => props.textColor || '#fff'};
  font-size: 19px;
  text-align: center;
  width: 100%;
  padding: 20px;
`;

/**
 * Round Style Button
 * @param title {string} button text
 * @param onPress {func} button press callback
 * @param buttonColor {color} button color
 * @param textColor {color} button text color
 * @param style {object}
 * <br>
 * {
 *  wrap: 'applied on TouchableOpacity element'
 *  button: 'applied on button wrap'
 *  text: 'applied on button text'
 * }
 * @returns {RoundButton}
 * @constructor
 */
const RoundButton = ({
  title, onPress, buttonColor, textColor, style,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={style.wrap}
  >
    <ButtonWrap
      style={[{
        shadowColor: Colors.primaryColor,
        shadowRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: { width: 5, height: 5 },
      }, style.button]}
      buttonColor={buttonColor}
    >
      <ButtonText
        style={style.text}
        textColor={textColor}
      >
        {title}
      </ButtonText>
    </ButtonWrap>
  </TouchableOpacity>
);


RoundButton.defaultProps = {
  buttonColor: Colors.primaryColor,
  textColor: '#fff',
  style: {},
};

RoundButton.propTypes = {
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    wrap: PropTypes.object,
    button: PropTypes.object,
    text: PropTypes.object,
  }),
};

export default RoundButton;
