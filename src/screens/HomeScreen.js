import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { AsyncStorage, FlatList, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import { authLogout, fetchRestaurant } from '../actions';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../constants/assets';
import Section from '../base_components/Section';
import RestaurantItem from '../components/RestaurantItem';
import FilterModal from '../components/FilterModal';
import ViewRow from '../base_components/ViewRow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RippleIcon from '../base_components/RippleIcon';
import FilterRadioModal from '../components/FilterRadioModal';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
  }

  async componentDidMount() {
    // const value = await AsyncStorage.getItem('authToken');
    // if (!value) {
    //   Actions.replace('loginScreen');
    // }
    this.props.fetchRestaurant();
  }


  handleSignOut = async () => {
    this.props.authLogout();
    Actions.reset('loginScreen');
  };

  renderHeader = () => (
    <ViewRow
      jc="space-between"
      ai="center"
      style={{
        padding: 20,
      }}
    >
      <PrimaryText
        size={20}
        align="left"
        style={{
          flex: 1,
        }}
      >
        Restaurants
      </PrimaryText>
      <RippleIcon
        style={{
          flex: 0,
        }}
        dark
        onPress={() => this.filterModalRef.open()}
        name="md-funnel"
        size={30}
      />
    </ViewRow>);

  renderRestaurantSection = () => (
    <FlatList
      data={this.props.restaurantList}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      ListHeaderComponent={this.renderHeader}
      renderItem={this.renderRestaurantList}
      keyExtractor={item => item._id}
    />
  );


  renderRestaurantList = ({ item: restaurant }) => {
    if (restaurant) {
      return (
        <RestaurantItem
          restaurant={restaurant}
          onPress={() => Actions.restaurantScreen({
            restaurant,
          })}
        />
      );
    }
    return null;
  };

  render() {
    const filterData = [
      {
        label: 'Chinese',
        value: 'chinese',
      },
      {
        label: 'North Indian',
        value: 'north-indian',
      },
      {
        label: 'Biryani',
        value: 'biryani',
      }];

    return (
      <AppBase style={{
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}
      >
        <FilterRadioModal
          heading="Cuisine Type"
          data={filterData}
          // eslint-disable-next-line no-return-assign
          pRef={el => (this.filterModalRef = el)}
          close={() => this.filterModalRef.close()}
          onClose={(array) => {
            // return array of selected values in same format as input
            console.log(array);
          }}
        />
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
  authLogout: PropTypes.func.isRequired,
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
    authLogout,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
