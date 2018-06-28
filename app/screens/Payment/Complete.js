import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';

import RoundButton from '../../base_components/RoundButton';
import AppBase from '../../base_components/AppBase';
import Assets from '../../../src/constants/assets';

const ImageSection = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Divider = styled.View`
  width: 80%;
  margin: 30px auto 10px auto;
  border-bottom-width: 1px;
  border-bottom-color: #E0E2E5;
`;

const SuccessText = styled.Text`
  color: #6EC015;
  font-size: 20px;
  text-align: center;
  margin: 20px auto;
`;

const PriceText = styled.Text`
  font-size: 40px;
  color: #213052;
  text-align: center;
`;

const CentText = PriceText.extend`
  font-size: 25px;
`;

const Currency = styled.Text`
  font-size: 24px;
  margin: 0 5px;
  color: #99AAC6;
`;

class PaymentComplete extends Component {
  render() {
    const { totalAmount } = this.props;
    const rupee = (`${totalAmount}`).split('.')[0];
    const paise = (`${totalAmount}`).split('.')[1].padEnd(2, '0') || '00';

    return (
      <AppBase
        style={{
          backgroundColor: '#ffffff',
          justifyContent: 'space-evenly',
        }}
      >
        <ImageSection>
          <SuccessText>Payment Successful</SuccessText>
          <Image
            style={{
              width: 120,
              height: 120,
            }}
            resizeMode="contain"
            source={Assets.Images.paymentComplete}
          />

          <SuccessText>Your payment has been approved!</SuccessText>
          <Divider />
        </ImageSection>

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Currency>₹</Currency>
          <PriceText>{rupee}<CentText>.{paise}</CentText></PriceText>
        </View>

        <RoundButton
          baseStyle={{
            alignSelf: 'flex-end',
          }}
          title="Back to Home"
          onPress={() => {
            Actions.reset('homeScreen');
          }}
        />
      </AppBase>
    );
  }
}

PaymentComplete.propTypes = {
  totalAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default PaymentComplete;
