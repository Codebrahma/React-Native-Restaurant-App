import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import styled, { consolidateStreamedStyles } from 'styled-components';
import { PrimaryText } from '../../base_components/sharedComponents';
import RestaurantItem from '../../base_components/RestaurantItem';
import RestaurantInfo from '../../screens/RestaurantInfoScreen';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});
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
    const { classes } = this.props;
    return (
      <div>
        <PrimaryText size="20px" align="center">Restaurants</PrimaryText>
        {this.props.cuisine && (
        <Chip
          key={this.props.cuisine}
          label={this.props.cuisine}
          onDelete={this.props.onDelete}
          className={classes.chip}
        />)}
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
  classes: PropTypes.instanceOf(Object).isRequired,
  cuisine: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

RestaurantGrid.defaultProps = {
  cuisine: '',
};

export default withRouter(withStyles(styles)(RestaurantGrid));
