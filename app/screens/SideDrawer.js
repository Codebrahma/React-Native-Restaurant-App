import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrimaryText from '../base_components/PrimaryText';
import AppBase from '../base_components/AppBase';

class SideDrawer extends Component {
  render() {
    return (
      <AppBase
        style={{
          paddingTop: 40,
        }}
      >
        <PrimaryText>hello</PrimaryText>
      </AppBase>
    );
  }
}

SideDrawer.propTypes = {};

export default SideDrawer;
