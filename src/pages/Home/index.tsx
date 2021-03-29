import React from 'react';
import {ScrollView, Text, FlatList, View, ListRenderItemInfo, StyleSheet } from 'react-native';
import { RootStackNavigation } from '../../navigator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Carousel from './Carousel';
import GuessYouLike from './GuessYouLike';
import ChannelItem from './ChannelItem';
import homeModel, { IChannel } from '@/models/home';

const mapStateToProps = (state: RootState) => ({
  carouselImages: state.home.carouselImages,
  loading: state.loading.effects['home/fetchChannelData'],
  channels: state.home.channels,
  hasMore: state.home.pagination.hasMore,
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
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
        />
    );
  }

  onEndReached = () => {
    const { dispatch, loading, hasMore } = this.props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: 'home/fetchChannelData',
      payload: {
        loadMore: true,
      },
    });
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

  get renderFooter() {
    const {loading, hasMore, channels} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.footer}>
          <Text>--No More--</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.footer}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }

  get renderEmpty() {
    const {loading} = this.props;
    if (loading) {
      return null;
    }
    return (
      <View style={styles.empty}>
        <Text>No data</Text>
      </View>
    )
  }

  get renderHeader() {
    const { carouselImages, loading } = this.props;
    return (
      <View>
        {loading ? <Text>Loading....</Text> : null}
        <Carousel />
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

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
});

export default connector(Home);
