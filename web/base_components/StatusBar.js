import React from 'react';
import { StatusBarView, PrimaryText } from './sharedComponents';
import colors from '../../src/constants/colors';

const StatusBar = () => (
  <StatusBarView>
    <PrimaryText width="0%">RestaurantApp</PrimaryText>
    <i className="material-icons md-24 md-light">add_shopping_cart</i>
  </StatusBarView>
);

export default StatusBar;
