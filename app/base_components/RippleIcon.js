/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ripple from 'react-native-material-ripple';
import Ionicons from 'react-native-vector-icons/Ionicons';


const RippleWrap = styled(Ripple)`
     padding: 8px 8px;
     width: 48px;
     height: 48px;
     align-items: center;
     justify-content: center;
 `;

/**
 * an Icon wrapped with the Ripple effect.
 * @author Nishchay Kaushik
 * @param  name {String} name of the icon from {@link https://oblador.github.io/react-native-vector-icons/ | Ionicons} class
 * @param  color {string} color code for name
 * @param  size {number} size of the name, default=26
 * @param  style {object} styles for the RippleWrap
 * @param  rippleColor {string} color code for the ripple
 * @param  onPress {func} callback to call on Icon Press
 * @param dark {bool} dark name
 * @returns {RippleIcon}
 * @constructor
 */
const RippleIcon = ({
  name, onPress, size, color, rippleColor, style, dark,
}) => (
  <RippleWrap
    style={style}
    rippleDuration={400}
    rippleColor={rippleColor || (dark ? '#123da7' : '#fff')}
    onPress={onPress}
    rippleCentered
  >
    <Ionicons
      name={name}
      color={color || (dark ? '#000' : '#eee')}
      size={size}
    />
  </RippleWrap>
);

RippleIcon.defaultProps = {
  size: 26,
  dark: false,
  rippleColor: null,
  color: null,
  style: {},
};

RippleIcon.propTypes = {
  rippleColor: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  dark: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

export default RippleIcon;
