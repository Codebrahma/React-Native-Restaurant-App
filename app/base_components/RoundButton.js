import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../../src/constants/colors';

const LoadingWrap = styled.View`
  background-color: ${props => props.buttonColor};
  margin: 10px auto;
  padding: 15px;
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
  width: ${props => (props.small ? '100px' : '90%')};
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
  font-size: ${props => (props.small ? '16px' : '19px;')};
  text-align: center;
  width: 100%;
  padding: ${props => (props.small ? '10px;' : '20px;')}
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
      small,
      title, onPress, buttonColor, textColor, style, loading, disabled,
    } = this.props;

    const buttonStyles = disabled ? style.button :
      [{
        shadowColor: buttonColor,
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: { width: 5, height: 5 },
      }, style.button];

    if (loading) {
      return (
        <LoadingWrap buttonColor={buttonColor}>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingWrap>
      );
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
        style={style.wrap}
      >
        <ButtonWrap
          small={small}
          disabled={disabled}
          style={buttonStyles}
          buttonColor={buttonColor}
        >
          <ButtonText
            small={small}
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
  small: false,
};

RoundButton.propTypes = {
  small: PropTypes.bool,
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
