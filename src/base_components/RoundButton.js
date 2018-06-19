import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../constants/colors';

const LoadingWrap = styled.View`
  background-color: ${Colors.primaryColor};
  margin: 10px auto;
  padding: 10px;
  width: 150px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  elevation: 3;
`;

const ButtonWrap = styled.View`
  background-color: ${props => (props.disabled ? '#ddd' : props.buttonColor || '#000')};
  margin: 10px auto;
  width: 90%;
  padding: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
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
class RoundButton extends React.Component {
  render() {
    const {
      title, onPress, buttonColor, textColor, style, loading, disabled,
    } = this.props;

    const buttonStyles = disabled ? style.button :
      [{
        shadowColor: Colors.primaryColor,
        shadowRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: { width: 5, height: 5 },
      }, style.button];

    if (loading) {
      return (
        <LoadingWrap>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingWrap>
      );
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={style.wrap}
      >
        <ButtonWrap
          disabled={disabled}
          style={buttonStyles}
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
  }
}


RoundButton.defaultProps = {
  buttonColor: Colors.primaryColor,
  textColor: '#fff',
  style: {},
  loading: false,
  disabled: false,
};

RoundButton.propTypes = {
  disabled: PropTypes.bool,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    wrap: PropTypes.object,
    button: PropTypes.object,
    text: PropTypes.object,
  }),
};

export default RoundButton;
