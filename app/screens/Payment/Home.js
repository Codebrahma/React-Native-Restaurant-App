import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import Stripe from 'react-native-stripe-api';
import { CreditCardInput } from 'react-native-credit-card-input';
import { Dimensions, KeyboardAvoidingView, ScrollView, View, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';


import RoundButton from '../../base_components/RoundButton';
import AppBase from '../../base_components/AppBase';
import BR from '../../base_components/BR';

const windowWidth = Dimensions.get('window').width - 18;

const Heading = styled.Text`
  font-size: 14px;
  color: #9DA8BA;
  text-align: center;
  margin-bottom: 10px;
`;

const SubHeading = styled.Text`
  font-size: 16px;
  color: #213052;
  text-align: center;
`;

const Section = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px 20px;
  background: #FFF;
`;
const SectionItem = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;  
`;

class PaymentHome extends Component {
  static navigationOptions = {
    title: 'Make Payment',
    headerStyle: {
      backgroundColor: '#f5f5f5',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: '#fcfcfc',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitle: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      cardData: {},
      validData: false,
      loadingPayment: false,
    };
  }

  _onChange = (form) => {
    console.log(form);
    this.setState((s, p) => ({
      cardData: form,
      validData: form.valid,
    }));
  };

  doPayment = async () => {
    this.setState({
      loadingPayment: true,
    });

    const { totalAmount } = this.props;
    const { cardData: { values: cardValue } } = this.state;


    console.log('cardData', cardValue);
    const apiKey = 'pk_test_rM2enW1rNROwx4ukBXGaIzhr';
    const client = new Stripe(apiKey);
    const expMonth = cardValue.expiry.split('/')[0];
    const expYear = cardValue.expiry.split('/')[1];
    // Create a Stripe token with new card infos
    const token = await client.createToken({
      number: cardValue.number.replace(' ', ''),
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cardValue.cvc,
      address_zip: cardValue.postalCode,
    });

    console.log(token);

    if (token) {
      Actions.paymentSuccess({
        totalAmount,
      });
    } else {
      Actions.paymentFailed({
        totalAmount,
      });
    }
  };

  render() {
    const { orderId, totalAmount } = this.props;

    return (
      <AppBase>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
        >
          <ScrollView
            bounces={false}
          >
            <BR size={10} />
            <Section>
              <SectionItem>
                <Heading>{'Order Id'.toUpperCase()}</Heading>
                <SubHeading>{orderId}</SubHeading>
              </SectionItem>
            </Section>

            <Section>
              <SectionItem>
                <Heading>SELLER</Heading>
                <SubHeading>Restaurant App</SubHeading>
              </SectionItem>
              <SectionItem>
                <Heading>PRICE</Heading>
                <SubHeading>₹ {totalAmount}</SubHeading>
              </SectionItem>
            </Section>

            <Section style={{
              elevation: 3,
              borderBottomWidth: 2,
              borderBottomColor: '#eee',
            }}
            >
              <SectionItem>
                <Heading>Date</Heading>
                <SubHeading>{new Date().toDateString()}</SubHeading>
              </SectionItem>
            </Section>

            <View style={{
              marginTop: 20,
            }}
            >
              <CreditCardInput
                requiresCVC
                cardScale={1}
                inputContainerStyle={{
                  backgroundColor: '#FFF',
                  paddingTop: 15,
                  paddingBottom: 5,
                  flexDirection: 'column',
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderWidth: 1,
                  borderColor: '#eee',
                  minWidth: 150,
                  borderRadius: 6,
                }}
                onChange={debounce(this._onChange, 500)}
              />
            </View>

            <RoundButton
              loading={this.state.loadingPayment}
              title="Make Payment"
              onPress={() => this.doPayment()}
              disabled={!this.state.validData}
              baseStyle={{
                marginTop: 30,
                marginBottom: Platform.OS === 'ios' ? 100 : 20,
              }}
            />

          </ScrollView>
        </KeyboardAvoidingView>
      </AppBase>
    );
  }
}

PaymentHome.defaultProps = {
  orderId: 'SDDJ233-675DG21',
};

PaymentHome.propTypes = {
  orderId: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default PaymentHome;
