/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { AsyncStorage, FlatList, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import { fetchRestaurant } from '../../src/actions/index';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../../src/constants/assets';
import FoodItem from '../components/FoodItem';
import ViewRow from '../base_components/ViewRow';
import BR from '../base_components/BR';
import { updateCartItems } from '../../src/actions/cart';

class RestaurantInfoScreen extends Component {
  async componentDidMount() {
    const value = await AsyncStorage.getItem('authToken');
    if (!value) {
      Actions.replace('loginScreen');
    }
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
    <ViewRow
      jc="space-between"
      style={{
        backgroundColor: '#fff',
        borderColor: '#eee',
        padding: 20,
        borderBottomWidth: 1,
        marginTop: 2,
      }}
    >
      <PrimaryText
        style={{
          flex: 1,
        }}
        size={20}
      >
        Menu
      </PrimaryText>
    </ViewRow>
  );

  renderFoodItem = ({ item }) => {
    if (item) {
      return (
        <FoodItem
          food={item}
          onPress={() => this.props.updateCartItems(item, 1)}
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
            <PrimaryText align="left" size={24}>{restaurantName}</PrimaryText>
            <BR size={5} />
            <SecondaryText align="left" size={16}>{details}</SecondaryText>
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
  updateCartItems: PropTypes.func.isRequired,
  // authLogout: PropTypes.func.isRequired,
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
    updateCartItems,
    // authLogout,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(RestaurantInfoScreen);
