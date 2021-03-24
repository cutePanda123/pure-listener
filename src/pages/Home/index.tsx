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

interface IState {
  refreshing: boolean;
}

class Home extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  render(): JSX.Element {
    const { carouselImages, loading, channels } = this.props;
    const { refreshing } = this.state;
    return (
      <FlatList
          data={channels}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={this.keyExtractor}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
        />
    );
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchChannelData',
      callback: () => {
        this.setState({
          refreshing: false,
        });
      }
    });
  }

  get renderHeader() {
    const { carouselImages, loading } = this.props;
    return (
      <View>
        {loading ? <Text>Loading....</Text> : null}
        <Carousel 
          data={carouselImages}
        />
        <GuessYouLike/>
      </View>
    );
  }

  keyExtractor = (item: IChannel) => {
    return item.id;
  }

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return (
      <ChannelItem 
        data={item}
        onPressHandler={this.onPress}
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

  onPress = (data: IChannel) => {
    console.log('print data from onPress:', data);
  }
}

export default connector(Home);
