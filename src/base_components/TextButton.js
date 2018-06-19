import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SecondaryText from './SecondaryText';
import PrimaryText from './PrimaryText';

const TextButton = ({
  title, primary, onPress, ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
  >
    {
      primary && <PrimaryText {...props}>{title}</PrimaryText>
    }

    {
      !primary && <SecondaryText {...props}>{title}</SecondaryText>
    }
  </TouchableOpacity>
);

TextButton.defaultProps = {
  primary: false,
};

TextButton.propTypes = {
  primary: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};


export default TextButton;
