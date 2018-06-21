/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, Image, ScrollView, View } from 'react-native';


import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import { authLogout, fetchRestaurant } from '../actions';
import SecondaryText from '../base_components/SecondaryText';
import Assets from '../constants/assets';
import FoodItem from '../components/FoodItem';
import FilterModal from '../components/FilterModal';
import ViewRow from '../base_components/ViewRow';

class RestaurantInfoScreen extends Component {
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

  renderFoodList = foods => (
    <FlatList
      data={foods}
      bounces={false}
      ListHeaderComponent={this.renderHeader}
      keyExtractor={item => item._id}
      renderItem={this.renderFoodItem}
    />
  );

  renderHeader = () => (
    <ViewRow
      jc="space-between"
      style={{
        backgroundColor: '#fff',
        borderColor: '#eee',
        padding: 20,
        borderBottomWidth: 1,
        marginTop: 2,
      }}
    >
      <PrimaryText
        style={{
          flex: 1,
        }}
        size={20}
      >
        Menu
      </PrimaryText>
      <Ionicons
        style={{
          flex: 0,
        }}
        onPress={() => this.filterModalRef.open()}
        name="md-funnel"
        size={30}
      />
    </ViewRow>
  );

  renderFoodItem = ({ item }) => {
    if (item) {
      return (
        <FoodItem
          food={item}
          onPress={() => {
          }}
        />
      );
    }
    return null;
  };

  render() {
    const { restaurant: { name: restaurantName, details, foods } } = this.props;
    const filterData = [{
      label: 'Chinese',
      value: 'chinese',
      checked: false,
    },
    {
      label: 'North Indian',
      value: 'north-indian',
      checked: false,
    },
    {
      label: 'Biryani',
      value: 'biryani',
      checked: false,
    }];
    return (
      <AppBase
        style={{
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
      >
        <FilterModal
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
        <ScrollView>
          <Image
            source={Assets.Images.placeholderRestaurant}
            style={{
              width: '100%',
              height: 200,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              backgroundColor: '#fff',
              padding: 15,
            }}
          >
            <PrimaryText align="left" size={24}>{restaurantName}</PrimaryText>
            <SecondaryText align="left" size={18}>{details}</SecondaryText>
          </View>
          {this.renderFoodList(foods)}
        </ScrollView>
      </AppBase>
    );
  }
}

RestaurantInfoScreen.defaultProps = {};

RestaurantInfoScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  // authLogout: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

function initMapStateToProps(state) {
  return {
    restaurantList: state.restaurant.fullList,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRestaurant,
    // authLogout,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(RestaurantInfoScreen);
