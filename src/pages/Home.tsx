import React from 'react';
import {View, Text, Button} from 'react-native';
import { RootStackNavigation } from '../navigator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  num: state.home.num,
})

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation
};

class Home extends React.Component<IProps> {
  render(): JSX.Element {
    const { num } = this.props;
    return (
      <View>
        <Text>Home{num}</Text>
        <Button title="Add Number" onPress={this.addHandler} />
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

  addHandler =() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/add',
      payload: {
        num: 10,
      }
    });
  }
}

export default connector(Home);
