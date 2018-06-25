/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { AsyncStorage, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';

import AppBase from '../base_components/AppBase';
import { authLogout, fetchCuisineTypes, fetchRestaurant, fetchRestaurantByType } from '../actions';
import FilterRadioModal from '../components/FilterRadioModal';
import CuisineGrid from '../components/CuisineGrid';
import RestaurantList from '../components/RestaurantList';
import { fetchCartItems } from '../actions/cart';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
    // eslint-disable-next-line react/prop-types
    if (props.rightTitle !== 'Sign Out') {
      Actions.refresh({
        rightTitle: 'Sign Out',
        onRight: () => this.handleSignOut(),
        ...props,
      });
    }
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem('authToken');
    if (!value) {
      Actions.replace('loginScreen');
    }

    if (this.props.rightTitle === 'Sign Out') {
      this.props.fetchRestaurant();
      this.props.fetchCuisineTypes();
      this.props.fetchCartItems();
    }
  }


  handleSignOut = async () => {
    this.props.authLogout();
    Actions.reset('loginScreen');
  };

  handleFilter = (type) => {
    if (type !== null) {
      this.props.fetchRestaurantByType(type);
    } else {
      this.props.fetchRestaurant();
    }
  };

  openCuisineScreen = (value) => {
    Actions.cuisineRestaurants({
      cuisineType: value,
      backTitle: 'Back',
      title: startCase(value),
      rightTitle: 'Sign Out',
      onRight: () => this.handleSignOut(),
    });
  };

  render() {
    const filterData = this.props.cuisineTypes.map(type => ({
      value: type,
      label: startCase(type),
    }));

    return (
      <AppBase style={{
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}
      >
        {
          filterData.length > 0 &&
          <FilterRadioModal
            heading="Cuisine Type"
            data={filterData}
            // eslint-disable-next-line no-return-assign
            pRef={el => (this.filterModalRef = el)}
            close={() => this.filterModalRef.close()}
            onClose={this.handleFilter}
          />
        }
        <ScrollView>
          <CuisineGrid
            data={this.props.cuisineTypes}
            onPress={this.openCuisineScreen}
          />
          <RestaurantList
            hideFilter
            restaurantList={this.props.restaurantList}
          />
        </ScrollView>
      </AppBase>
    );
  }
}

HomeScreen.defaultProps = {
  restaurantList: [],
  cuisineTypes: [],
};

HomeScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  authLogout: PropTypes.func.isRequired,
  fetchRestaurantByType: PropTypes.func.isRequired,
  fetchCuisineTypes: PropTypes.func.isRequired,
  fetchCartItems: PropTypes.func.isRequired,
  restaurantList: PropTypes.array,
  cuisineTypes: PropTypes.array,
};

function initMapStateToProps(state) {
  return {
    cuisineTypes: state.food.cuisineTypes,
    restaurantList: state.restaurant.fullList,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRestaurant,
    fetchRestaurantByType,
    authLogout,
    fetchCuisineTypes,
    fetchCartItems,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
