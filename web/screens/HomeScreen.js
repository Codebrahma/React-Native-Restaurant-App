import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import { fetchRestaurant, fetchCuisineTypes, fetchRestaurantByType } from '../../src/actions';
import { PrimaryText } from '../base_components/sharedComponents';
import StatusBar from '../base_components/StatusBar';
import RestaurantGrid from '../components/cuisinesAndRestaurants/RestaurantGrid';
import CuisineGrid from '../components/cuisinesAndRestaurants/CuisineGrid';
import AppBase from '../base_components/AppBase';

const BaseLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class HomeScreen extends React.Component {
  state={
    restaurantList: this.props.restaurantList,
    withFilter: false,
    cuisine: '',
  }
  componentWillMount() {
    this.props.fetchCuisineTypes();
    this.props.fetchRestaurant();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.cuisineRestaurants)) {
      this.setState({
        restaurantList: this.props.cuisineRestaurants,
      });
    }
  }

  onDelete =() => {
    this.setState({
      restaurantList: this.props.restaurantList,
      cuisine: '',
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBase>
        <Grid container direction="row" className={classes.root}>
          <Grid item sm={3}>
            <CuisineGrid
              cuisineTypes={this.props.cuisineTypes}
              fetchRestaurantByType={(cuisine, bwithfilter) => {
                this.setState({ cuisine });
                this.props.fetchRestaurantByType(cuisine, bwithfilter);
}}
            />
          </Grid>
          <Grid item sm={9}>
            <RestaurantGrid
              restaurants={this.state.restaurantList}
              cuisine={this.state.cuisine}
              onDelete={this.onDelete}
            />
          </Grid>
        </Grid>
      </AppBase>
    );
  }
}

const mapStateToProps = ({ food, restaurant }) => ({
  cuisineTypes: food.cuisineTypes,
  restaurantList: restaurant.fullList,
  cuisineRestaurants: restaurant.cuisineRestaurants,
});

const mapDispatchToProps = {
  fetchRestaurant,
  fetchCuisineTypes,
  fetchRestaurantByType,
};


// restaurantList: PropTypes.arrayOf(React.PropTypes.instanceOf(Object)).isRequired,
// cuisineRestaurants: PropTypes.arrayOf(React.PropTypes.instanceOf(Object))

HomeScreen.propTypes = {
  fetchCuisineTypes: PropTypes.func.isRequired,
  fetchRestaurant: PropTypes.func.isRequired,
  cuisineTypes: PropTypes.instanceOf(Object).isRequired,
};

HomeScreen.defaultProps = {
  cuisineRestaurants: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeScreen));
