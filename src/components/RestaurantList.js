/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, View } from 'react-native';

import startCase from 'lodash/startCase';
import { Actions } from 'react-native-router-flux';
import RestaurantItem from './RestaurantItem';
import Assets from '../constants/assets';
import ViewRow from '../base_components/ViewRow';
import PrimaryText from '../base_components/PrimaryText';
import RippleIcon from '../base_components/RippleIcon';
import BR from '../base_components/BR';

class RestaurantList extends Component {
  handleFilter = (type) => {
    this.props.handleFilter(type);
  };

  renderHeader = () => (
    <ViewRow
      jc="space-between"
      ai="center"
      style={{
        padding: 20,
      }}
    >
      <PrimaryText
        size={20}
        align="left"
        style={{
          flex: 1,
        }}
      >
        Restaurants
      </PrimaryText>
      <RippleIcon
        style={{
          flex: 0,
        }}
        dark
        onPress={() => this.filterModalRef.open()}
        name="md-funnel"
        size={30}
      />
    </ViewRow>);

  renderEmptySection = () => {
    if (!this.props.restaurantList || this.props.restaurantList.length === 0) {
      return (
        <View>
          {this.renderHeader()}
          <View
            style={{
              backgroundColor: '#fdfdfd',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              flexDirection: 'column',
            }}
          >
            <Image
              source={Assets.Images.banana}
              style={{
                width: 150,
                height: 150,
              }}
            />
            <BR />
            <PrimaryText>
              {'We couldn\'t find anything.'}
            </PrimaryText>
            <BR />
            <PrimaryText>
              Please try again...
            </PrimaryText>
          </View>
        </View>
      );
    }
    return null;
  };

  renderRestaurantSection = () => (
    (this.props.restaurantList && this.props.restaurantList.length > 0)
      ?
        <FlatList
          data={this.props.restaurantList}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderRestaurantList}
          keyExtractor={item => item._id}
        />
      : this.renderEmptySection()
  );


  renderRestaurantList = ({ item: restaurant }) => {
    if (restaurant) {
      return (
        <RestaurantItem
          restaurant={restaurant}
          onPress={() => Actions.restaurantScreen({
            title: startCase(restaurant.name),
            backTitle: 'Back',
            rightTitle: 'Sign Out',
            onRight: () => this.handleSignOut(),
            restaurant,
          })}
        />
      );
    }
    return null;
  };

  render() {
    return (
      this.renderRestaurantSection()
    );
  }
}

RestaurantList.propTypes = {
  restaurantList: PropTypes.array.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default RestaurantList;
