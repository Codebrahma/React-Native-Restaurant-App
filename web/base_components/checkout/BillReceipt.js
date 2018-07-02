import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../src/constants/colors';
import { PrimaryText } from '../sharedComponents';

const Container = styled.div`
  background-color: ${Colors.white};
  width: 100%;
  padding: 2%;
`;

const BillTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 3%;
`;

const MainContainer = styled.div`
  display: flex;
  width: 80%;
  border-style: solid;
  align-items: center;
  justify-content: center;
  padding: 2%;
  margin: 1%;
  border-color: ${Colors.lightGrey};
  border-width: 2px;
  box-shadow: 2px 2px ${Colors.lightGrey};
  background-color: ${Colors.white};
`;

const BillRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  justify-content: space-between;
  padding-vertical: 2%;
`;

const HorizontalLine = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
`;

class BillReceipt extends React.Component {
  calculateTotalBill = (totalBill, tax) => {
    const totalAmountToBePaid = (totalBill + tax + 30) - 18;
    return totalAmountToBePaid;
  }
  render() {
    return (
      <MainContainer>
        <Container>
          <BillTitle>Bill Receipt</BillTitle>
          {
            this.props.billInfo.map(item => (
              <BillRow key={item.name}>
                <div>{item.name}</div>
                <div>{`₹ ${item.total}`}</div>
              </BillRow>
            ))
          }
          <HorizontalLine />
          <BillRow>
            <div>Total Pay</div>
            <div>{parseFloat(this.props.total).toFixed(2)} ₹</div>
          </BillRow>
        </Container>
      </MainContainer>
    );
  }
}

BillReceipt.propTypes = {
  billInfo: PropTypes.instanceOf(Object).isRequired,
  total: PropTypes.number.isRequired,
};

export default BillReceipt;
