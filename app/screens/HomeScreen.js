/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';

import SignOutButton from '../components/SignOutButton';
import AppBase from '../base_components/AppBase';
import CuisineGrid from '../components/CuisineGrid';
import PrimaryText from '../base_components/PrimaryText';
import RestaurantList from '../components/RestaurantList';
import FilterRadioModal from '../components/FilterRadioModal';
import { fetchCuisineTypes, fetchRestaurant, fetchRestaurantByType } from '../../src/actions/index';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <PrimaryText>Restaurant App</PrimaryText>,
    headerRight: <SignOutButton />,
  });

  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
  }

  componentDidMount() {
    const { restaurantList, cuisineTypes } = this.props;
    if (!restaurantList || restaurantList.length === 0) {
      this.props.fetchRestaurant();
    }

    if (!cuisineTypes || cuisineTypes.length === 0) {
      this.props.fetchCuisineTypes();
    }
  }

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
            onFilterIconPress={() => this.filterModalRef.open()}
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
  fetchRestaurantByType: PropTypes.func.isRequired,
  fetchCuisineTypes: PropTypes.func.isRequired,
  // fetchCartItems: PropTypes.func.isRequired,
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
    fetchCuisineTypes,
    // fetchCartItems,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
