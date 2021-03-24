import React from 'react';
import {ScrollView, Text, FlatList, View, ListRenderItemInfo } from 'react-native';
import { RootStackNavigation } from '../../navigator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Carousel from './Carousel';
import GuessYouLike from './GuessYouLike';
import ChannelItem from './ChannelItem';
import { IChannel } from '@/models/home';

const mapStateToProps = (state: RootState) => ({
  carouselImages: state.home.carouselImages,
  loading: state.loading.effects['home/fetchCarouselImages'],
  channels: state.home.channels,
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation
};

class Home extends React.Component<IProps> {
  render(): JSX.Element {
    const { carouselImages, loading, channels } = this.props;
    return (
      <ScrollView>
        {loading ? <Text>Loading....</Text> : null}
        <Carousel 
          data={carouselImages}
        />
        <GuessYouLike/>
        <FlatList
          data={channels}
          renderItem={this.renderItem}
        />
      </ScrollView>
    );
  }

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return (
      <ChannelItem 
        data={item}
      />
    );
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchCarouselImages',
    });
    dispatch({
      type: 'home/fetchChannelData',
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
