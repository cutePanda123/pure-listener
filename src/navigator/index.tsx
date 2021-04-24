import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import ChannelDetail from '../pages/ChannelDetail';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import Category from '../pages/Category';
import {RouteProp} from '@react-navigation/core';
import {Animated} from 'react-native';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  ChannelDetail: {
    item: {
      id: string;
      title: string;
      imageURL: string;
    };
    opacity?: Animated.Value;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

function getChannelDetailOptions(routeProp: {
  route: RouteProp<RootStackParamList, 'ChannelDetail'>;
}) {
  return {
    headerTitle: routeProp.route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: routeProp.route.params.opacity,
    },
    headerBackground: () => {
      return (
        <Animated.View
          style={[
            styles.headerBackground,
            {
              opacity: routeProp.route.params.opacity,
            },
          ]}
        />
      );
    },
  };
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

let Stack = createStackNavigator<RootStackParamList>();

export type ModalStackParamList = {
  Root: undefined;
  Detail: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamList>();

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

function ModalStackScreen() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="screen">
      <ModalStack.Screen name="Root" component={RootStackScreen} options={{headerShown: false}} />
      <ModalStack.Screen name="Detail" component={ChannelDetail} />
    </ModalStack.Navigator>
  )
}

class Navigator extends React.Component {
  render(): JSX.Element {
    return (
      <NavigationContainer>
        <ModalStackScreen />
      </NavigationContainer>
    );
  }
}

function RootStackScreen() {
  return (
    <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight,
              },
            }),
            headerBackTitleVisible: false,
            headerTintColor: '#333',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen
            options={{
              headerTitle: 'Home',
            }}
            name="BottomTabs"
            component={BottomTabs}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Category',
            }}
            name="Category"
            component={Category}
          />
          <Stack.Screen
            options={getChannelDetailOptions}
            name="ChannelDetail"
            component={ChannelDetail}
          />
        </Stack.Navigator>
  );
}

export default Navigator;
