import React from 'react';
import {View, Text} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator/';

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
    const {headerHeight, summary, author, route} = this.props;
    const {title, imageURL} = route.params.item;
    return (
      <View
        style={{
          paddingTop: headerHeight,
        }}>
        <Text>Channel Detail</Text>
      </View>
    );
  }
}

const Wrapper = (props: IProps) => {
  const headerHeight = useHeaderHeight();
  return <ChannelDetail {...props} headerHeight={headerHeight} />;
};

export default connector(Wrapper);
