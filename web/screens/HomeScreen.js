import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRestaurant, fetchCuisineTypes } from '../../src/actions';
import { PrimaryText } from '../base_components/sharedComponents';
import StatusBar from '../base_components/StatusBar';
import RestaurantGrid from '../components/cuisinesAndRestaurants/RestaurantGrid';
import CuisineGrid from '../components/cuisinesAndRestaurants/CuisineGrid';
import AppBase from '../base_components/AppBase';

const BaseLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

class HomeScreen extends React.Component {
  componentWillMount() {
    this.props.fetchCuisineTypes();
    this.props.fetchRestaurant();
  }

  render() {
    return (
      <AppBase>
        <BaseLayout>
          <CuisineGrid cuisineTypes={this.props.cuisineTypes} />
          <RestaurantGrid restaurants={this.props.restaurantList} />
        </BaseLayout>
      </AppBase>
    );
  }
}

const mapStateToProps = ({ food, restaurant }) => ({
  cuisineTypes: food.cuisineTypes,
  restaurantList: restaurant.fullList,
});

const mapDispatchToProps = {
  fetchRestaurant,
  fetchCuisineTypes,
};

HomeScreen.propTypes = {
  fetchCuisineTypes: PropTypes.func.isRequired,
  fetchRestaurant: PropTypes.func.isRequired,
  cuisineTypes: PropTypes.instanceOf(Object).isRequired,
  restaurantList: PropTypes.instanceOf(Object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
