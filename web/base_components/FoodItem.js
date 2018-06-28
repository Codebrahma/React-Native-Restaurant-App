import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../src/constants/colors';
import { PrimaryText } from './sharedComponents';

const Container = styled.div`
  display: flex;
  width: 25%;
  height: 250px;
  background-color: ${Colors.lightGrey};
  margin: 1%;
  justify-content: space-between;
  align-items: center;
`;

const CuisineDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
`;

const FoodItem = ({ image, name }) => {
  const source = image || '../../assets/images/placeholder-res.png';
  return (
    <Container>
      <CuisineDetailsContainer>
        <img src={source} alt={name} width="100%" height="90%" />
        <PrimaryText size="18px">{name}</PrimaryText>
      </CuisineDetailsContainer>
    </Container>
  );
};

FoodItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

FoodItem.defaultProps = {
  image: null,
};

export default FoodItem;
