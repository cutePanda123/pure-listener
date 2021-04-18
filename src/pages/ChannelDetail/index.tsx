import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator/index';
import coverRight from '@/assets/cover-right.png';
import {BlurView} from '@react-native-community/blur';

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
}

class ChannelDetail extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch, route} = this.props;
    const {id} = route.params.item;
    dispatch({
      type: 'channelDetail/fetchChannelDetail',
      payload: {
        id,
      },
    });
  }

  render() {
    return <View>{this.renderHeader()}</View>;
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
        <View style={styles.leftView}>
          <Image source={{uri: imageURL}} style={styles.thumbnail} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>{summary}</Text>
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
  header: {
    height: 260,
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
