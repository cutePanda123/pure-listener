import React from 'react';
import {ScrollView, Text } from 'react-native';
import { RootStackNavigation } from '../../navigator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Carousel from './Carousel';
import GuessYouLike from './GuessYouLike';

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
      <ScrollView>
        {loading ? <Text>Loading....</Text> : null}
        <Carousel 
          data={carouselImages}
        />
        <GuessYouLike

        />
      </ScrollView>
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
