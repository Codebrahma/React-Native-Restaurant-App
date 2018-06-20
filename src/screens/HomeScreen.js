import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { AsyncStorage, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import { fetchRestaurant } from '../actions';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../constants/assets';
import Section from '../base_components/Section';

class HomeScreen extends Component {
  async componentDidMount() {
    // const value = await AsyncStorage.getItem('authToken');
    // if (!value) {
    //   Actions.replace('loginScreen');
    // }
    this.props.fetchRestaurant();
  }


  handleSignOut = async () => {
    await AsyncStorage.removeItem('authToken');
    Actions.reset('loginScreen');
  };

  renderRestaurantSection = () => (
    <Section
      title="Restaurants"
      style={{
          width: '100%',
          height: 340,
        }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{}}
      >
        {this.renderRestaurantList()}
      </ScrollView>
    </Section>
  );


  renderRestaurantList = () => {
    const { restaurantList } = this.props;
    if (restaurantList) {
      return restaurantList.map(restaurant => (
        <View
          key={restaurant._id}
          style={{
            width: 250,
            minHeight: 250,
            backgroundColor: '#fff',
            margin: 10,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Image
            source={Assets.Images.placeholderRestaurant}
            style={{
              width: '100%',
              height: 150,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
            }}
          >
            <PrimaryText size={18} style={{ marginBottom: 5 }}>
              {restaurant.name}
            </PrimaryText>
            <SecondaryText>
              {restaurant.details}
            </SecondaryText>
          </View>
        </View>));
    }
    return null;
  };

  render() {
    return (
      <AppBase>
        <TextButton title="Sign Out" onPress={this.handleSignOut} />
        {this.renderRestaurantSection()}
      </AppBase>
    );
  }
}

HomeScreen.defaultProps = {
  restaurantList: [],
};

HomeScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  restaurantList: PropTypes.array,
};

function initMapStateToProps(state) {
  return {
    restaurantList: state.restaurant.fullList,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRestaurant,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
