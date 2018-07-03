import React from 'react';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RippleIcon from '../base_components/RippleIcon';

class DrawerImage extends React.Component {
  isIOS = () => Platform.OS === 'ios';

  render() {
    let iconName = 'md-menu';
    let isBack = false;


    if (Actions.currentScene.includes('homeScreen')) {
      iconName = 'md-menu';
      isBack = false;
    } else {
      iconName = this.isIOS() ? 'ios-arrow-back' : 'md-arrow-back';
      isBack = true;
    }

    return (
      <RippleIcon
        dark
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginRight: 15,
          marginTop: this.isIOS() ? -16 : 5,
        }}
        size={30}
        name={iconName}
        onPress={() => {
          if (isBack) {
            Actions.drawerClose();
            Actions.pop();
          } else {
            Actions.drawerOpen();
          }
        }}
      />
    );
  }
}

DrawerImage.propTypes = {};

export default DrawerImage;
