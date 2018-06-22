/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, AsyncStorage, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import { authLogout, fetchCuisineTypes, fetchRestaurant, fetchRestaurantByType } from '../actions';
import Assets from '../constants/assets';
import RestaurantItem from '../components/RestaurantItem';
import ViewRow from '../base_components/ViewRow';
import RippleIcon from '../base_components/RippleIcon';
import FilterRadioModal from '../components/FilterRadioModal';
import BR from '../base_components/BR';
import CuisineGrid from '../components/CuisineGrid';
import RestaurantList from '../components/RestaurantList';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
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
          <CuisineGrid data={this.props.cuisineTypes} onPress={value => console.log(value)} />
          <RestaurantList
            restaurantList={this.props.restaurantList}
            handleFilter={this.handleFilter}
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
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
