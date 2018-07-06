import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { PrimaryText } from '../base_components/sharedComponents';
import StatusBar from '../base_components/StatusBar';
import FoodItem from '../base_components/FoodItem';
import { updateCartItems } from '../../src/actions/cart';
import AppBase from '../base_components/AppBase';

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 45vh;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4%;
  margin: 2%;
`;

const FoodContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

class RestaurantInfo extends React.Component {
  displayFoods = foods => foods.map(foodItem =>
    (foodItem.food != null ?
      <FoodItem
        item={foodItem}
        key={foodItem.food._id}
        onClick={() => this.props.updateCartItems(foodItem, 1)}
      />
      : null))

  render() {
    const result = this.props.restaurant(this.props.match.params.id)[0];
    const source = '../../assets/images/food.jpeg';
    return (
      <AppBase>
        <ImageContainer>
          <img src={source} alt={result.name} width="100%" style={{ resizeMode: 'contain' }} />
        </ImageContainer>
        <NameContainer>
          <PrimaryText>{result.name}</PrimaryText>
          <PrimaryText>{result.details}</PrimaryText>
        </NameContainer>
        <FoodContainer>
          {this.displayFoods(result.foods)}
        </FoodContainer>
      </AppBase>
    );
  }
}

const getRestaurant = state => state.restaurant.fullList;

const findRestaurant = createSelector(
  [getRestaurant],
  fullList => restaId => fullList.filter(restaurant => (restaId === restaurant._id)),
);

const mapStateToProps = state => ({
  restaurant: findRestaurant(state),
});

const mapDispatchToProps = {
  updateCartItems,
};

RestaurantInfo.propTypes = {
  restaurant: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  updateCartItems: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantInfo);
