/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Assets from '../constants/assets';
import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';

const RestaurantItem = ({ restaurant, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
  >
    <View
      key={restaurant._id}
      style={{
        width: 250,
        minHeight: 220,
        backgroundColor: '#fff',
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Image
        source={Assets.Images.placeholderRestaurant}
        style={{
          width: '100%',
          height: 150,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 15,
        }}
      >
        <PrimaryText size={18} align="left" style={{ marginBottom: 5 }}>
          {restaurant.name}
        </PrimaryText>
        <SecondaryText>
          {restaurant.details}
        </SecondaryText>
      </View>
    </View>
  </TouchableOpacity>
);

RestaurantItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};


export default RestaurantItem;
