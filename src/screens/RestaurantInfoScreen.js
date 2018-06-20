/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { AsyncStorage, FlatList, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import { authLogout, fetchRestaurant } from '../actions';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../constants/assets';
import Section from '../base_components/Section';
import RestaurantItem from '../components/RestaurantItem';
import FoodItem from '../components/FoodItem';

class RestaurantInfoScreen extends Component {
  async componentDidMount() {
    // const value = await AsyncStorage.getItem('authToken');
    // if (!value) {
    //   Actions.replace('loginScreen');
    // }
    this.props.fetchRestaurant();
  }


  handleSignOut = async () => {
    this.props.authLogout();
    Actions.reset('loginScreen');
  };

  renderFoodList = foods => (
    <FlatList
      data={foods}
      bounces={false}
      style={{
        flex: 1,
      }}
      renderItem={this.renderFoodItem}
    />
  );


  renderFoodItem = ({ item }) => {
    if (item) {
      return (
        <FoodItem
          food={item}
          onPress={() => {
          }}
        />
      );
    }
    return null;
  };

  render() {
    const { restaurant: { name: restaurantName, details, foods } } = this.props;
    return (
      <AppBase
        style={{
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
      >
        <Image
          source={Assets.Images.placeholderRestaurant}
          style={{
            width: '100%',
            height: 200,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 15,
          }}
        >
          <PrimaryText align="left" size={26}>{restaurantName}</PrimaryText>
          <SecondaryText align="left" size={22}>{details}</SecondaryText>
          {this.renderFoodList(foods)}
        </View>
      </AppBase>
    );
  }
}

RestaurantInfoScreen.defaultProps = {
  restaurantList: [],
};

RestaurantInfoScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  authLogout: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
  restaurantList: PropTypes.array,
};

function initMapStateToProps(state) {
  return {
    restaurantList: state.restaurant.fullList,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRestaurant,
    authLogout,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(RestaurantInfoScreen);
