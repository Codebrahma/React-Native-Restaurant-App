import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import colors from '../../../src/constants/colors';
import { PrimaryText } from '../../base_components/sharedComponents';

const styles = {
  cuisieContainer: {
    padding: '1%',
    borderColor: colors.lightGrey,
    borderStyle: 'solid',
    textAlign: 'left',
    height: '100vh',
  },
  cuisine: {
    textAlign: 'left',
  },
};

class CuisineGrid extends React.Component {
  state={ checked: '' }
  capitalise = data => data.charAt(0).toUpperCase() + data.slice(1);

  filter = (cuisine) => {
    if (this.state.checked === '' || this.state.checked !== cuisine) {
      this.setState({
        checked: cuisine,
      }, () => {
        this.props.fetchRestaurantByType(this.state.checked, true);
      });
    } else {
      this.setState({
        checked: '',
      }, () => {
        this.props.onDelete();
      });
    }
  }

  displayCuisineList = () => this.props.cuisineTypes.map(cuisine =>
    (
      <ListItem key={cuisine}>
        <input
          type="checkbox"
          name="checkbox"
          checked={this.state.checked === cuisine}
          onClick={() => this.filter(cuisine)}
        />
        <div style={styles.cuisine}>{this.capitalise(cuisine)}</div>
      </ListItem>
    ))

  render() {
    return (
      <div style={styles.cuisieContainer}>
        <PrimaryText size="20px" align="left">Cuisines</PrimaryText>
        <List>
          {this.displayCuisineList()}
        </List>
      </div>
    );
  }
}

CuisineGrid.propTypes = {
  cuisineTypes: PropTypes.instanceOf(Object).isRequired,
  fetchRestaurantByType: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(CuisineGrid);
