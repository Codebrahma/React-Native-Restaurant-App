import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.View`
  height: 10%;
  width: 100%;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AmountContainer = styled.View`
  flex: 0.5;
  align-items: center;
  height: 100%;
  background-color: #d9d9d9;
  justify-content: center;
`;

const PayButton = styled.TouchableOpacity`
  height: 100%;
  background-color: green;
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled.Text`
  font-weight: bold;
  color: #eee;
  font-size: 16px;
`;


const Footer = ({ totalAmount }) => (
  <FooterContainer>
    <AmountContainer>
      <FooterText>{totalAmount}</FooterText>
    </AmountContainer>
    <PayButton>
      <FooterText>
        Proceed To Pay
      </FooterText>
    </PayButton>
  </FooterContainer>
);


export default Footer;
