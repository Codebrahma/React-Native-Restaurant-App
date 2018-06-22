/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';


import Assets from '../constants/assets';
import PrimaryText from '../base_components/PrimaryText';
import ViewRow from '../base_components/ViewRow';

class CuisineGrid extends Component {
  renderHeader = () => (
    <ViewRow
      jc="space-between"
      ai="center"
      style={{
        padding: 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        zIndex: 1,
        borderBottomColor: '#f2f2f2',
      }}
    >
      <PrimaryText
        size={20}
        align="left"
        style={{
          flex: 1,
        }}
      >
        Cuisine
      </PrimaryText>
    </ViewRow>);

  renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpactiy={0.6}
      style={{
        width: '100%',
        flex: 1,
      }}
      onPress={() => this.props.onPress(item)}
    >
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
          margin: 10,
          borderRadius: 5,
          height: '100%',
          borderWidth: 1,
          borderColor: '#f2f2f2',
          elevation: 2,
          backgroundColor: '#fafafa',
        }}
      >
        <Image
          source={Assets.Images[item]}
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode="contain"
        />
        <View
          style={{
            marginTop: 0,
            height: 3,
            width: 80,
            margin: 'auto',
            borderRadius: 10,
            shadowRadius: 5,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            backgroundColor: '#fafafa',
            shadowColor: '#000',
          }}
        />
        <PrimaryText style={{
          marginTop: 20,
        }}
        >
          {startCase(item)}
        </PrimaryText>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        numColumns={2}
        ListHeaderComponent={this.renderHeader}
        data={this.props.data}
        keyExtractor={item => item}
        renderItem={this.renderItem}
      />
    );
  }
}

CuisineGrid.propTypes = {
  onPress: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default CuisineGrid;
