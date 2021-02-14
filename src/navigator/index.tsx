import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

let Stack = createStackNavigator<RootStackParamList>();
class Navigator extends React.Component {
  render(): JSX.Element {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
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
