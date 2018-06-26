/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { AsyncStorage, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AppBase from '../../app/base_components/AppBase';
import { authLogout, fetchRestaurantByType } from '../actions';
import RestaurantList from '../../app/components/RestaurantList';

class CuisineRestaurantScreen extends Component {
  async componentDidMount() {
    const value = await AsyncStorage.getItem('authToken');
    if (!value) {
      Actions.replace('loginScreen');
    }

    this.props.fetchRestaurantByType(this.props.cuisineType, true);
  }


  handleSignOut = async () => {
    this.props.authLogout();
    Actions.reset('loginScreen');
  };

  handleFilter = (type) => {
  };

  render() {
    return (
      <AppBase style={{
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}
      >
        <ScrollView>
          <RestaurantList
            restaurantList={this.props.restaurantList}
            handleFilter={this.handleFilter}
          />
        </ScrollView>
      </AppBase>
    );
  }
}

CuisineRestaurantScreen.defaultProps = {
  restaurantList: [],
};

CuisineRestaurantScreen.propTypes = {
  cuisineType: PropTypes.string.isRequired,
  authLogout: PropTypes.func.isRequired,
  fetchRestaurantByType: PropTypes.func.isRequired,
  restaurantList: PropTypes.array,
};

function initMapStateToProps(state) {
  return {
    restaurantList: state.restaurant.cuisineRestaurants,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRestaurantByType,
    authLogout,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CuisineRestaurantScreen);
