/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, AsyncStorage, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';

import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import { authLogout, fetchCuisineTypes, fetchRestaurant, fetchRestaurantByType } from '../actions';
import Assets from '../constants/assets';
import RestaurantItem from '../components/RestaurantItem';
import ViewRow from '../base_components/ViewRow';
import RippleIcon from '../base_components/RippleIcon';
import FilterRadioModal from '../components/FilterRadioModal';
import BR from '../base_components/BR';
import CuisineGrid from '../components/CuisineGrid';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
    if (props.rightTitle !== 'Sign Out') {
      Actions.refresh({
        rightTitle: 'Sign Out',
        onRight: () => this.handleSignOut(),
        ...props,
      });
    }
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem('authToken');
    if (!value) {
      Actions.replace('loginScreen');
    }

    if (this.props.rightTitle === 'Sign Out') {
      this.props.fetchRestaurant();
      this.props.fetchCuisineTypes();
    }
  }


  handleSignOut = async () => {
    this.props.authLogout();
    Actions.reset('loginScreen');
  };

  handleFilter = (type) => {
    if (type !== null) {
      this.props.fetchRestaurantByType(type);
    } else {
      this.props.fetchRestaurant();
    }
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

  renderEmptySection = () => {
    if (!this.props.restaurantList || this.props.restaurantList.length === 0) {
      return (
        <View>
          {this.renderHeader()}
          <View
            style={{
              backgroundColor: '#fdfdfd',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              flexDirection: 'column',
            }}
          >
            <Image
              source={Assets.Images.banana}
              style={{
                width: 150,
                height: 150,
              }}
            />
            <BR />
            <PrimaryText>
              {'We couldn\'t find anything.'}
            </PrimaryText>
            <BR />
            <PrimaryText>
              Please try again...
            </PrimaryText>
          </View>
        </View>
      );
    }
    return null;
  };

  renderRestaurantSection = () => (
    (this.props.restaurantList && this.props.restaurantList.length > 0)
      ?
        <FlatList
          data={this.props.restaurantList}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderRestaurantList}
          keyExtractor={item => item._id}
        />
      : this.renderEmptySection()
  );


  renderRestaurantList = ({ item: restaurant }) => {
    if (restaurant) {
      return (
        <RestaurantItem
          restaurant={restaurant}
          onPress={() => Actions.restaurantScreen({
            title: startCase(restaurant.name),
            backTitle: 'Back',
            rightTitle: 'Sign Out',
            onRight: () => this.handleSignOut(),
            restaurant,
          })}
        />
      );
    }
    return null;
  };

  render() {
    const filterData = this.props.cuisineTypes.map(type => ({
      value: type,
      label: startCase(type),
    }));

    return (
      <AppBase style={{
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}
      >
        {
          filterData.length > 0 &&
          <FilterRadioModal
            heading="Cuisine Type"
            data={filterData}
            // eslint-disable-next-line no-return-assign
            pRef={el => (this.filterModalRef = el)}
            close={() => this.filterModalRef.close()}
            onClose={this.handleFilter}
          />
        }
        <ScrollView>
          <CuisineGrid data={this.props.cuisineTypes} onPress={value => console.log(value)} />
          {this.renderRestaurantSection()}
        </ScrollView>
      </AppBase>
    );
  }
}

HomeScreen.defaultProps = {
  restaurantList: [],
  cuisineTypes: [],
};

HomeScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  authLogout: PropTypes.func.isRequired,
  fetchRestaurantByType: PropTypes.func.isRequired,
  fetchCuisineTypes: PropTypes.func.isRequired,
  restaurantList: PropTypes.array,
  cuisineTypes: PropTypes.array,
};

function initMapStateToProps(state) {
  return {
    cuisineTypes: state.food.cuisineTypes,
    restaurantList: state.restaurant.fullList,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRestaurant,
    fetchRestaurantByType,
    authLogout,
    fetchCuisineTypes,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
