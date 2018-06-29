import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { PrimaryText } from '../base_components/sharedComponents';
import StatusBar from '../base_components/StatusBar';
import FoodItem from '../base_components/FoodItem';

const Container = styled.div`
  position: absolute;
  top: 8%;
`;

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
  abc = () => {};

  displayFoods = foods => foods.map(foodItem =>
    (foodItem.food != null ?
      <FoodItem
        item={foodItem}
        key={foodItem.food._id}
      />
      : null))

  render() {
    const result = this.props.restaurant(this.props.match.params.id)[0];
    const source = '../../assets/images/food.jpeg';
    return (
      <div>
        <StatusBar />
        <Container>
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
        </Container>
      </div>
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

RestaurantInfo.propTypes = {
  restaurant: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, {})(RestaurantInfo);
