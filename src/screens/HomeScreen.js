import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import BR from '../base_components/BR';
import TextInput from '../base_components/TextInput';
import SecondaryText from '../base_components/SecondaryText';
import RoundButton from '../base_components/RoundButton';

class HomeScreen extends Component {
  render() {
    return (
      <AppBase>
        <PrimaryText bold size={26}>Home Screen</PrimaryText>
      </AppBase>
    );
  }
}

HomeScreen.propTypes = {};

export default HomeScreen;
