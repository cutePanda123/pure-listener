import React from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import {ModalStackNavigation, RootStackParamList} from '@/navigator/index';
import coverRight from '@/assets/cover-right.png';
import {BlurView} from '@react-native-community/blur';
import Tab from './Tab';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {viewPortHeight} from '@/utils/index';
import { NativeSyntheticEvent } from 'react-native';
import { NativeScrollEvent } from 'react-native';
import { IProgram } from '@/models/channelDetail';

const mapStateToProps = ({channelDetail}: RootState) => {
  return {
    summary: channelDetail.summary,
    author: channelDetail.author,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'ChannelDetail'>;
  navigation: ModalStackNavigation;
}

const HEADER_HEIGHT = 260;
const USE_NATIVE_DRIVER = true;

class ChannelDetail extends React.Component<IProps> {
  panGestureHandlerRef = React.createRef<PanGestureHandler>();
  tapGestureHandlerRef = React.createRef<TapGestureHandler>();
  nativeGestureHandlerRef = React.createRef<NativeViewGestureHandler>();
  range = [-(HEADER_HEIGHT - this.props.headerHeight), 0];
  translationYValue = 0;
  translaionYOffset = new Animated.Value(0);
  translationY = new Animated.Value(0);
  lastScrollY = new Animated.Value(0);
  lastScrollYValue = 0;
  reversedLastScrollY = Animated.multiply(
    new Animated.Value(-1),
    this.lastScrollY,
  );
  translateY = Animated.add(
    Animated.add(this.translationY, this.reversedLastScrollY),
    this.translaionYOffset,
  );
  componentDidMount() {
    const {dispatch, route, navigation} = this.props;
    const {id} = route.params.item;
    dispatch({
      type: 'channelDetail/fetchChannelDetail',
      payload: {
        id,
      },
    });
    navigation.setParams({
      opacity: this.translationY.interpolate({
        inputRange: this.range,
        outputRange: [1, 0],
      }),
    });
  }

  onScrollDrag = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: this.lastScrollY,
          },
        },
      },
    ],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.lastScrollYValue = nativeEvent.contentOffset.y;
      }
    },
  );

  onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: this.translationY,
        },
      },
    ],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
    },
  );

  onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {translationY} = nativeEvent;
      translationY -= this.lastScrollYValue;
      this.translaionYOffset.extractOffset();
      this.translaionYOffset.setValue(translationY);
      this.translaionYOffset.flattenOffset();
      this.translationY.setValue(0);
      this.translationYValue += translationY;
      let maxDeltaY = -this.range[0] - this.translationYValue;
      if (this.translationYValue < this.range[0]) {
        this.translationYValue = this.range[0];
        Animated.timing(this.translaionYOffset, {
          toValue: this.range[0],
          duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = this.range[1];
      } else if (this.translationYValue > this.range[1]) {
        this.translationYValue = this.range[1];
        Animated.timing(this.translaionYOffset, {
          toValue: this.range[1],
          duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = -this.range[0];
      }
      if (this.tapGestureHandlerRef.current) {
        const tap: any = this.tapGestureHandlerRef.current;
        tap.setNativeProps({
          maxDeltaY,
        });
      }
    }
  };

  render() {
    return (
      <TapGestureHandler
        ref={this.tapGestureHandlerRef}
        maxDeltaY={-this.range[0]}>
        <View style={styles.container}>
          <PanGestureHandler
            ref={this.panGestureHandlerRef}
            simultaneousHandlers={[
              this.tapGestureHandlerRef,
              this.nativeGestureHandlerRef,
            ]}
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={this.onHandlerStateChange}>
            <Animated.View
              style={[
                styles.container,
                {
                  // backgroundColor: this.translateY.interpolate({
                  //   inputRange: [-170, 0],
                  //   outputRange: ['red', '#fff'],
                  // }),
                  // opacity: this.translateY.interpolate({
                  //   inputRange: [-170, 0],
                  //   outputRange: [1, 0],
                  // }),
                  transform: [
                    {
                      translateY: this.translateY.interpolate({
                        inputRange: this.range,
                        outputRange: this.range,
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              {this.renderHeader()}
              <View style={{height: viewPortHeight - this.props.headerHeight}}>
                <Tab
                  nativeGestureHandlerRef={this.nativeGestureHandlerRef}
                  tapGestureHandlerRef={this.tapGestureHandlerRef}
                  panGestureHandlerRef={this.panGestureHandlerRef}
                  onScrollDrag={this.onScrollDrag}
                  onItemPress={this.onItemPress}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TapGestureHandler>
    );
  }

  onItemPress = (data: IProgram, index: number) => {
    const {navigation} = this.props;
    navigation.navigate("Detail");
  }

  renderHeader() {
    const {headerHeight, summary, author, route} = this.props;
    const {title, imageURL} = route.params.item;
    return (
      <View
        style={[
          {
            paddingTop: headerHeight,
          },
          styles.header,
        ]}>
        <Image source={{uri: imageURL}} style={styles.backgroundImg} />
        <BlurView
          blurAmount={10}
          blurType="light"
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.leftView}>
          <Image source={{uri: imageURL}} style={styles.thumbnail} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
            <View style={styles.author}>
              <Image source={{uri: author.avatar}} style={styles.avatar} />
              <Text style={styles.authorName}>{author.name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  leftView: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain',
  },
  rightView: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  summaryText: {
    color: '#fff',
  },
  summary: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  authorName: {
    color: '#fff',
  },
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
});

const Wrapper = (props: IProps) => {
  const headerHeight = useHeaderHeight();
  return <ChannelDetail {...props} headerHeight={headerHeight} />;
};

export default connector(Wrapper);
