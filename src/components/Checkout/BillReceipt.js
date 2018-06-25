import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import TearLines from 'react-native-tear-lines';

const Container = styled.View`
  background-color: white;
  padding: 5%;
`;

const BillTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 3%;
`;

const BillRow = styled.View`
  flex-direction: row;
  padding: 10px 0;
  justify-content: space-between;
  padding-vertical: 2%;
`;

const HorizontalLine = styled.View`
  border-width: 1px;
  border-color: #d9d9d9;
`;


class BillReceipt extends Component {
  render() {
    let total = 0;
    return (
      <View>
        <Container
          onLayout={(e) => {
            this.refs.bottom.onLayout(e);
          }}
        >
          <View>
            <BillTitle>Bill Receipt</BillTitle>
          </View>
          {
            this.props.billInfo.map((item, index) => {
              total += item.total;
              return (
                <BillRow>
                  <Text>{item.name}</Text>
                  <Text>{item.total} ₹</Text>
                </BillRow>
              );
            })
          }
          <HorizontalLine />
          <BillRow>
            <Text>Total Pay</Text>
            <Text>{total} ₹</Text>
          </BillRow>
        </Container>
        <TearLines
          isUnder
          ref="bottom"
        />
      </View>
    );
  }
}

export default BillReceipt;
