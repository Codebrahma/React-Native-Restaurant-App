import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchRestaurant, fetchCuisineTypes } from '../../../src/actions';
import colors from '../../../src/constants/colors';
import { PrimaryText } from '../../base_components/sharedComponents';
import StatusBar from '../../base_components/StatusBar';
import RestaurantGrid from './RestaurantGrid';

const BaseLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const CuisineContainer = styled.div`
  padding: 1%;
  width: 15vw;
  border-color: ${colors.lightGrey};
  border-style: solid;
  text-align: left;
  position: fixed;
  top: 8%;
  height: -webkit-fill-available;
`;

const ListStyle = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const KeyContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2%;
  align-items: center;
`;

const Heading = styled.div`
  font-family: Roboto Slab;
  font-size: ${props => (props.size ? props.size : '16px')};
`;

class CuisineGrid extends React.PureComponent {
  componentWillMount() {
    this.props.fetchCuisineTypes();
    this.props.fetchRestaurant();
  }

  displayCuisineList = () => this.props.cuisineTypes.map(cuisine =>
    (
      <KeyContainer>
        <input type="checkbox" name="checkbox" />
        <li key={cuisine}>
          <PrimaryText color={colors.black}>{cuisine}</PrimaryText>
        </li>
      </KeyContainer>
    ))

  render() {
    return (
      <div>
        <StatusBar />
        <BaseLayout>
          <CuisineContainer>
            <PrimaryText size="20px" align="left">Cuisines</PrimaryText>
            <ListStyle>{this.displayCuisineList()}</ListStyle>
          </CuisineContainer>
          <RestaurantGrid restaurants={this.props.restaurantList} />
        </BaseLayout>
      </div>
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

CuisineGrid.propTypes = {
  fetchCuisineTypes: PropTypes.func.isRequired,
  fetchRestaurant: PropTypes.func.isRequired,
  cuisineTypes: PropTypes.instanceOf(Object).isRequired,
  restaurantList: PropTypes.instanceOf(Object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(CuisineGrid);
