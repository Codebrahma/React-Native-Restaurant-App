/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native';

import AppBase from '../../app/base_components/AppBase';
import { authLogout, fetchRestaurantByType } from '../actions';
import RestaurantList from '../../app/components/RestaurantList';
import PrimaryText from '../../app/base_components/PrimaryText';
import SignOutButton from '../../app/components/SignOutButton';

class CuisineRestaurantScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <PrimaryText>Restaurant App</PrimaryText>,
    headerRight: <SignOutButton />,
  });

  componentDidMount() {
    this.props.fetchRestaurantByType(this.props.cuisineType, true);
  }

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
