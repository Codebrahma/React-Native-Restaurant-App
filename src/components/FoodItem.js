/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Assets from '../constants/assets';
import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';
import API from '../service/food';
import LoadingView from '../base_components/LoadingView';
import LoadingFood from '../base_components/LoadingFood';

class FoodItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      isLoading: true,
    };
  }


  componentDidMount() {
    if (this.props.food && this.props.food.food) {
      API.getFood(this.props.food.food).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.setState({
              info: res.data,
              isLoading: false,
            });
          }, 5000);
        }
      });
    }
  }

  render() {
    const { food, onPress } = this.props;
    const { info } = this.state;
    if (!info) {
      return <LoadingFood />;
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
      >
        <View
          key={food._id}
          style={{
            elevation: 2,
            minHeight: 220,
            backgroundColor: '#fff',
            margin: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Image
            source={Assets.Images.placeholderFood}
            style={{
              width: '100%',
              height: 150,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
            }}
          >
            <PrimaryText size={18} align="left" style={{ marginBottom: 5 }}>
              {info.name}
            </PrimaryText>
            <SecondaryText>
              {info.type}
            </SecondaryText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


FoodItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};


export default FoodItem;
