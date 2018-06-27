import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


import CounterButton from './CounterButton';
import PrimaryText from '../../base_components/PrimaryText';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 20px 10px;
`;

const NameView = styled.View`
  padding-left: 10px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

const RightSection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PriceText = styled.Text`
  text-align: right;
`;

const Item = ({
  name, price, onChange, qty,
}) => (
  <Container>
    <NameView>
      <PrimaryText size={14} align="left">{name}</PrimaryText>
    </NameView>
    <RightSection>
      <CounterButton onChange={onChange} qty={qty} />
      <PriceText>{price}</PriceText>
    </RightSection>
  </Container>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  qty: PropTypes.number.isRequired,
};


export default Item;
