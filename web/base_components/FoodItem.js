import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../src/constants/colors';
import { PrimaryText } from './sharedComponents';

const Container = styled.div`
  display: flex;
  width: 25%;
  height: 350px;
  margin: 1%;
  justify-content: space-between;
  align-items: center;
  box-shadow: 2px 4px 0px 0px ${Colors.slateGrey};
  border-color: ${Colors.slateGrey};
  border-style: solid;
  flex-direction: column;
`;

const CuisineDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 98%;
`;

const TypeContainer = styled.div`
  display: flex;
  width: 80%;
`;

const AddContainer = styled.div`
  padding: 2%;
`;

const FoodItem = ({ image, item }) => {
  const source = image || '../../assets/images/placeholder-food.png';
  return (
    <Container>
      <img src={source} alt={item.name} width="100%" height="70%" />
      <DetailsContainer>
        <PrimaryText>{item.food.name}</PrimaryText>
        <PrimaryText color={Colors.moneyColor}>{item.price}</PrimaryText>
      </DetailsContainer>
      <TypeContainer>
        <PrimaryText align="left" color={Colors.secondaryColor}>{item.food.type}</PrimaryText>
      </TypeContainer>
      <AddContainer>
        <PrimaryText color={Colors.blue}>Add to cart</PrimaryText>
      </AddContainer>
    </Container>
  );
};

FoodItem.propTypes = {
  image: PropTypes.string,
  item: PropTypes.instanceOf(Object).isRequired,
};

FoodItem.defaultProps = {
  image: null,
};

export default FoodItem;

