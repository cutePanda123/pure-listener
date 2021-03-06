import { RouteProp } from '@react-navigation/core';
import React from 'react';
import {View, Text} from 'react-native';
import { RootStackParamList } from '../navigator';

interface IProps {
  route: RouteProp<RootStackParamList, 'Detail'>
}

class Detail extends React.Component<IProps> {
  render(): JSX.Element {
    return (
      <View>
        <Text>Detail</Text>
        <Text>{this.props.route.params.id}</Text>
      </View>
    );
  }
}

export default Detail;
