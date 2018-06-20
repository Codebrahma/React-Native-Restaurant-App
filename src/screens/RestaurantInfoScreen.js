/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, Image, ScrollView, View } from 'react-native';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import { authLogout, fetchRestaurant } from '../actions';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../constants/assets';
import FoodItem from '../components/FoodItem';

class RestaurantInfoScreen extends Component {
  async componentDidMount() {
    // const value = await AsyncStorage.getItem('authToken');
    // if (!value) {
    //   Actions.replace('loginScreen');
    // }
    this.props.fetchRestaurant();
  }

  renderFoodList = foods => (
    <FlatList
      data={foods}
      bounces={false}
      ListHeaderComponent={this.renderHeader}
      keyExtractor={item => item._id}
      renderItem={this.renderFoodItem}
    />
  );

  renderHeader = () => (
    <View style={{
      backgroundColor: '#fff',
      borderColor: '#eee',
      padding: 20,
      borderBottomWidth: 1,
      marginTop: 2,
    }}
    >
      <PrimaryText size={20}>Menu</PrimaryText>
    </View>
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
        <ScrollView>
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
              backgroundColor: '#fff',
              padding: 15,
            }}
          >
            <PrimaryText align="left" size={26}>{restaurantName}</PrimaryText>
            <SecondaryText align="left" size={22}>{details}</SecondaryText>
          </View>
          {this.renderFoodList(foods)}
        </ScrollView>
      </AppBase>
    );
  }
}

RestaurantInfoScreen.defaultProps = {};

RestaurantInfoScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  authLogout: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
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
