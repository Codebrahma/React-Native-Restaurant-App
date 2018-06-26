import React from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native';
import CounterButton from './CounterButton';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px 10px;
`;

const NameView = styled.View`
  flex: 0.8;
  padding-left: 2%;
`;

const RightSection = styled.View`
  flex: 0.5;
  margin-left: 20px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const PriceContainer = styled.View`
  padding-horizontal: 5%;
  margin-left: 5%;
  width: 40%;
`;

const PriceText = styled.Text`
  text-align: right;
`;

const Item = ({ name, price, onChange, qty }) => (
  <Container>
    <NameView>
      <Text>{name}</Text>
    </NameView>
    <RightSection>
      <View>
        <CounterButton onChange={onChange} qty={qty} />
      </View>
      <PriceContainer>
        <PriceText>{price}</PriceText>
      </PriceContainer>
    </RightSection>
  </Container>
);

export default Item;
