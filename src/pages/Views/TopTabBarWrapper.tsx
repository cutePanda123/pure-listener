import Touchable from '@/components/Touchable';
import {RootState} from '@/models/';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({home}: RootState) => {
  return {
    linearColors:
      home.carouselImages &&
      home.carouselImages.length > home.activeCarouselIndex
        ? home.carouselImages[home.activeCarouselIndex].colors
        : undefined,
    isGradientVisible: home.isGradientVisible,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
  get linearGradient() {
    const {isGradientVisible, linearColors = ['#ccc', '#e2e2e2']} = this.props;
    return (
      isGradientVisible && (
        <LinearAnimatedGradientTransition
          colors={linearColors}
          style={styles.gradient}
        />
      )
    );
  }

  render() {
    const {isGradientVisible, indicatorStyle, ...restProps} = this.props;
    const textStyle = isGradientVisible ? styles.whiteText : styles.text;
    const tintColor = isGradientVisible ? '#fff' : '#333';
    const updatedIndicatorStyle =
      isGradientVisible && indicatorStyle
        ? StyleSheet.compose(indicatorStyle, styles.whiteBackgroundColor)
        : indicatorStyle;
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topTabBarViewTop}>
          <MaterialTopTabBar
            {...restProps}
            activeTintColor={tintColor}
            indicatorStyle={updatedIndicatorStyle}
            style={styles.tabBar}
          />
          <Touchable
            style={styles.topTabBarCategory}
            onPress={this.navigateToCategory}>
            <Text style={textStyle}>Category</Text>
          </Touchable>
        </View>
        <View style={styles.topTabBarViewBottom}>
          <Touchable style={styles.topTabBarSearch}>
            <Text style={textStyle}>Search</Text>
          </Touchable>
          <Touchable style={styles.topTabBarHistory}>
            <Text style={textStyle}>History</Text>
          </Touchable>
        </View>
      </View>
    );
  }

  navigateToCategory = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
  tabBar: {
    elevation: 0,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  topTabBarViewTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTabBarCategory: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  topTabBarViewBottom: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 7,
    alignItems: 'center',
  },
  topTabBarSearch: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  topTabBarHistory: {
    marginLeft: 24,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
});

export default connector(TopTabBarWrapper);
