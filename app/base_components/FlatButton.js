import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';

const DARK_VIOLET = '#0a98f2';
const PALE_BLUE = '#5ebcfc';
const WHITE = '#fff';

const ButtonText = styled.Text`
  font-weight: bold;
`;

const ButtonWrap = styled.View`
    padding: 15px 0;
    margin: 5px auto;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;

/**
 * Flat Style button component with text only style and ripple effect
 * @param fontSize {int} button text font size, default=15
 * @param title {String} button text
 * @param color {String} color code for button text
 * @param onPress {func} onPress callback
 * @param darkTheme {bool} default text Style for button text in darkTheme
 * @param style
 * @returns {FlatButton}
 * @constructor
 */

const FlatButton = ({
  fontSize, title, onPress, color, darkTheme, style,
}) => (
  <Ripple
    rippleCentered
    onPress={onPress}
    rippleDuration={400}
    rippleColor={darkTheme ? WHITE : DARK_VIOLET}
  >
    <ButtonWrap style={style}>
      <ButtonText
        style={{
          fontSize,
          color: color || (darkTheme ? PALE_BLUE : DARK_VIOLET),
        }}
      >{title.toUpperCase()}
      </ButtonText>
    </ButtonWrap>
  </Ripple>
);

FlatButton.defaultProps = {
  color: null,
  fontSize: 15,
  darkTheme: false,
  style: {},
};

FlatButton.propTypes = {
  darkTheme: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
};

export default FlatButton;
