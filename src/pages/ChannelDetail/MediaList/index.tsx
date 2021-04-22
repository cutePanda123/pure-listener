import React from 'react';
import {View, Text, FlatList, Alert, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ListRenderItemInfo} from 'react-native';
import {IProgram} from '@/models/channelDetail';
import Item from './Item';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {ITabProps} from '../Tab';

const mapStateToProps = ({channelDetail}: RootState) => {
  return {
    list: channelDetail.list,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

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
    const {
      list,
      panGestureHandlerRef,
      tapGestureHandlerRef,
      nativeGestureHandlerRef,
    } = this.props;
    return (
      <NativeViewGestureHandler
        simultaneousHandlers={[panGestureHandlerRef]}
        waitFor={tapGestureHandlerRef}
        ref={nativeGestureHandlerRef}>
        <FlatList
          style={styles.container}
          data={list}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </NativeViewGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default connector(MediaList);
