import React from 'react';
import {
  Text,
  FlatList,
  View,
  ListRenderItemInfo,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {RootStackNavigation} from '../../navigator';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel, {sideHeight} from './Carousel';
import GuessYouLike from './GuessYouLike';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';
import {RouteProp} from '@react-navigation/core';
import {HomeParamList} from '@/navigator/HomeTabs';

const mapStateToProps = (
  state: RootState,
  props: {route: RouteProp<HomeParamList, string>},
) => {
  const {namespace} = props.route.params;
  const modelState = state[namespace];

  return {
    namespace,
    carouselImages: modelState.carouselImages,
    loading: state.loading.effects[`${namespace}/fetchChannelData`],
    channels: modelState.channels,
    hasMore: modelState.pagination.hasMore,
    isGradientVisible: modelState.isGradientVisible,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  refreshing: boolean;
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  render(): JSX.Element {
    const {channels, namespace} = this.props;
    const {refreshing} = this.state;
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
        onScroll={this.onScrollHanlder}
      />
    );
  }

  onScrollHanlder = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    const newIsGradientVisible = offsetY < sideHeight;
    const {dispatch, isGradientVisible, namespace} = this.props;
    console.log('grandient:', isGradientVisible);
    console.log('namespace:', namespace);
    if (isGradientVisible !== newIsGradientVisible) {
      dispatch({
        type: `${namespace}/setState`,
        payload: {
          isGradientVisible: newIsGradientVisible,
        },
      });
    }
  };

  onEndReached = () => {
    const {dispatch, loading, hasMore, namespace} = this.props;
    if (loading || !hasMore) {
      return;
    }
    console.log('on end reached namespace: ', namespace);
    dispatch({
      type: `${namespace}/fetchChannelData`,
      payload: {
        loadMore: true,
      },
    });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });

    const {dispatch, namespace} = this.props;
    dispatch({
      type: `${namespace}/fetchGuessImages`,
    });
    dispatch({
      type: `${namespace}/fetchCarouselImages`,
      callback: () => {
        this.setState({
          refreshing: false,
        });
      },
    });
  };

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
    );
  }

  get renderHeader() {
    const {loading, namespace} = this.props;
    return (
      <View>
        {loading ? <Text>Loading....</Text> : null}
        <Carousel />
        <View style={styles.background}>
          <GuessYouLike
            namespace={namespace}
          />
        </View>
      </View>
    );
  }

  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPressHandler={this.onPress} />;
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarouselImages',
    });
    dispatch({
      type: 'home/fetchChannelData',
    });
  }

  onPress = (data: IChannel) => {
    console.log('print data from onPress:', data);
  };
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
  background: {
    backgroundColor: '#fff',
  },
});

export default connector(Home);
