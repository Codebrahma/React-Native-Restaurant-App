import React from 'react';
import { Animated, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import AppBase from './AppBase';
import Assets from '../../src/constants/assets';


class LoadingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.spin();
  }

  spin = () => {
    Animated.sequence([
      Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.spinValue, {
        toValue: 0,
        delay: 0,
        duration: 0,
        useNativeDriver: true,
      })]).start(() => this.spin());
  };


  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <AppBase style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#feffeb',
      }}
      >
        <Animated.Image
          source={Assets.Images.pizza}
          style={{
            width: 100,
            height: 100,
            transform: [{ rotate: spin }],
          }}
        />
        <View
          style={{
            width: 80,
            minHeight: 20,
            borderRadius: 5,
            backgroundColor: '#feffeb',
            shadowColor: '#dcddcc',
            shadowRadius: 0,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 10 },
          }}
        />
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            fontFamily: 'Roboto Slab',
          }}
        >
          Hang on. we will be right back…
        </Text>
      </AppBase>
    );
  }
}

LoadingView.propTypes = {};


export default LoadingView;
