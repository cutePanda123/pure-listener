import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import { Platform, StyleSheet } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

let Stack = createStackNavigator<RootStackParamList>();
class Navigator extends React.Component {
  render(): JSX.Element {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }
              })
            }
          }}>
          <Stack.Screen
            options={{
              headerTitle: 'Home Page',
            }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Detail Page',
            }}
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
