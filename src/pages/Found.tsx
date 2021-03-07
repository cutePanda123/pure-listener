import React from 'react';
import {View, Text, Button} from 'react-native';
import { RootStackNavigation } from '../navigator';

interface IProps {
  navigation: RootStackNavigation
};

class Found extends React.Component<IProps> {
  render(): JSX.Element {
    this.props;
    return (
      <View>
        <Text>Found</Text>
        <Button title="Jump to details" onPress={this.onPress} />
      </View>
    );
  }

  onPress = () => {
    const navigation = this.props.navigation;
    navigation.navigate("Detail", {
      id: 100,
    });
  }
}

export default Found;
