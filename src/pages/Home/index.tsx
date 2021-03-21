import React from 'react';
import {View, Text, Button} from 'react-native';
import { RootStackNavigation } from '../../navigator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Carousel from './Carousel';

const mapStateToProps = (state: RootState) => ({
  carouselImages: state.home.carouselImages,
  loading: state.loading.effects['home/fetchCarouselImages'],
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation
};

class Home extends React.Component<IProps> {
  render(): JSX.Element {
    const { carouselImages, loading } = this.props;
    return (
      <View>
        {loading ? <Text>Loading....</Text> : <Text>Home loaded</Text>}
        <Carousel 
          data={carouselImages}
        />
      </View>
    );
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchCarouselImages',
    });
  }

  onPress = () => {
    const navigation = this.props.navigation;
    navigation.navigate("Detail", {
      id: 100,
    });
  }
}

export default connector(Home);
