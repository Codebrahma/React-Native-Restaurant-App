/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, AsyncStorage, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';

import AppBase from '../../app/base_components/AppBase';
import PrimaryText from '../../app/base_components/PrimaryText';
import { authLogout, fetchCuisineTypes, fetchRestaurant, fetchRestaurantByType } from '../actions';
import Assets from '../constants/assets';
import RestaurantItem from '../../app/components/RestaurantItem';
import ViewRow from '../../app/base_components/ViewRow';
import RippleIcon from '../../app/base_components/RippleIcon';
import FilterRadioModal from '../../app/components/FilterRadioModal';
import BR from '../../app/base_components/BR';
import CuisineGrid from '../../app/components/CuisineGrid';
import RestaurantList from '../../app/components/RestaurantList';

class CuisineRestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
  }

  async componentDidMount() {
    console.log('in cdm');

    const value = await AsyncStorage.getItem('authToken');
    if (!value) {
      Actions.replace('loginScreen');
    }

    console.log('in');
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
