import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryText } from '../../base_components/sharedComponents';
import RestaurantItem from '../../base_components/RestaurantItem';
import RestaurantInfo from '../../screens/RestaurantInfoScreen';

const FoodContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

class RestaurantGrid extends React.Component {
  displayRestaurantList = () => this.props.restaurants.map(restaurant => (
    <RestaurantItem
      name={restaurant.name}
      key={restaurant._id}
      onClick={() => this.props.history.push(`/restaurantInfo/${restaurant._id}`)}
    />
  ))

  render() {
    return (
      <div>
        <PrimaryText size="20px" align="center">Restaurants</PrimaryText>
        <FoodContainer>
          {this.displayRestaurantList()}
        </FoodContainer>
      </div>
    );
  }
}

RestaurantGrid.propTypes = {
  restaurants: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(RestaurantGrid);
