import Touchable from '@/components/Touchable';
import {IProgram} from '@/models/channelDetail';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import IconFont from '@/assets/iconfont';

interface IProps {
  data: IProgram;
  index: number;
  onPressItem: (data: IProgram, index: number) => void;
}

class Item extends React.PureComponent<IProps> {
  onPress = () => {
    const {onPressItem, data, index} = this.props;
    console.log("!!!!!!!!@@@@@");
    if (_.isFunction(onPressItem)) {
      onPressItem(data, index);
    }
  };
  render() {
    const {data, index} = this.props;
    return (
      <Touchable style={styles.item} onPress={this.onPress}>
        <Text style={styles.index}>{index + 1}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.info}>
            <View style={styles.icon}>
              <IconFont name="icon-listen" color="#939393" />
              <Text style={styles.iconText}>{data.playTimes}</Text>
            </View>
            <View style={styles.icon}>
              <IconFont name="icon-time" color="#939393" />
              <Text style={styles.iconText}>{data.duration}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.date}>{data.createdDate}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
  },
  index: {
    fontSize: 14,
    color: '#838383',
    fontWeight: '800',
  },
  title: {
    fontWeight: '500',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText: {
      marginHorizontal: 5,
      color: '#939393',
  },
  date: {
    color: '#939393',
  }
});

export default Item;
