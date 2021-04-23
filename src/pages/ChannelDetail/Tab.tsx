import {tap, times} from 'lodash';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {TabBar, TabView} from 'react-native-tab-view';
import Introduction from './Introduction';
import MediaList from './MediaList';

interface IRoute {
  title: string;
  key: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

export interface ITabProps {
  panGestureHandlerRef: React.RefObject<PanGestureHandler>;
  tapGestureHandlerRef: React.RefObject<TapGestureHandler>;
  nativeGestureHandlerRef: React.RefObject<NativeViewGestureHandler>;
  onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

class Tab extends React.Component<ITabProps, IState> {
  state = {
    index: 1,
    routes: [
      {key: 'introduction', title: 'introduction'},
      {key: 'channels', title: 'titles'},
    ],
  };

  onIndexChange = (index: number) => {
    this.setState({
      index,
    });
  };

  renderScene = ({route}: {route: IRoute}) => {
    const {
      panGestureHandlerRef,
      tapGestureHandlerRef,
      nativeGestureHandlerRef,
      onScrollDrag
    } = this.props;
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'channels':
        return (
          <MediaList
            tapGestureHandlerRef={tapGestureHandlerRef}
            panGestureHandlerRef={panGestureHandlerRef}
            nativeGestureHandlerRef={nativeGestureHandlerRef}
            onScrollDrag={onScrollDrag}
          />
        );
    }
    return null;
  };

  renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        tabStyle={styles.tab}
        labelStyle={styles.label}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
      />
    );
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}>
        <Text>Tab</Text>
      </TabView>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    width: 80,
  },
  label: {
    color: '#333',
  },
  tabBar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  indicator: {
    backgroundColor: '#eb6d48',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderColor: '#fff',
  },
});

export default Tab;
