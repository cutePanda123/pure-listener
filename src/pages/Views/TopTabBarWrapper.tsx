import Touchable from '@/components/Touchable';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
 
interface IProps extends MaterialTopTabBarProps {}

class TopTabBarWrapper extends React.Component<IProps> {
  render() {
    const {props} = this;
    return (
      <View style={styles.container}>
          <LinearGradient
            colors={['#ccc', '#e2e2e2']}
            style={styles.gradient}
          />
        <View style={styles.topTabBarViewTop}>
          <MaterialTopTabBar {...props} style={styles.tabBar} />
          <Touchable style={styles.topTabBarCategory}>
            <Text>Category</Text>
          </Touchable>
        </View>
        <View style={styles.topTabBarViewBottom}>
          <Touchable style={styles.topTabBarSearch}>
            <Text>Search</Text>
          </Touchable>
          <Touchable style={styles.topTabBarHistory}>
            <Text>History</Text>
          </Touchable>
        </View>
      </View>
    );
  }
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
  }
});

export default TopTabBarWrapper;
