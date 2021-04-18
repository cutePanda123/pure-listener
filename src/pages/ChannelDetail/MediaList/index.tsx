import React from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ListRenderItemInfo} from 'react-native';
import {IProgram} from '@/models/channelDetail';
import Item from './Item';

const mapStateToProps = ({channelDetail}: RootState) => {
  return {
    list: channelDetail.list,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class MediaList extends React.Component<IProps> {
  onPressItem = (data: IProgram) => {
    alert('hello');
  };
  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPressItem} />;
  };

  keyExtractor = (item: IProgram) => {
    return item.id;
  };

  render() {
    const {list} = this.props;
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default connector(MediaList);
