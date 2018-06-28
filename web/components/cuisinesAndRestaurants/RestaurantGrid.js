import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PrimaryText } from '../../base_components/sharedComponents';
import FoodItem from '../../base_components/FoodItem';

const Container = styled.div`
  width: 80vw;
  position: absolute;
  left: 18vw;
  top: 9%;
`;

const FoodContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default class RestaurantGrid extends React.Component {
  displayRestaurantList = () => this.props.restaurants.map(restaurant => (
    <FoodItem name={restaurant.name} key={restaurant.id} />
  ))

  render() {
    return (
      <Container>
        <PrimaryText size="20px" align="center">Restaurants</PrimaryText>
        <FoodContainer>
          {this.displayRestaurantList()}
        </FoodContainer>
      </Container>
    );
  }
}

RestaurantGrid.propTypes = {
  restaurants: PropTypes.instanceOf(Object).isRequired,
};

