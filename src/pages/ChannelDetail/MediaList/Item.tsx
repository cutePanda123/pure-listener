import Touchable from '@/components/Touchable';
import {IProgram} from '@/models/channelDetail';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';

interface IProps {
  data: IProgram;
  index: number;
  onPress: (data: IProgram) => void;
}

class Item extends React.Component<IProps> {
  onPress = () => {
    const {onPress, data} = this.props;
    if (_.isFunction(onPress)) {
      onPress(data);
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
            <Text>{data.playTimes}</Text>
            <Text>{data.duration}</Text>
          </View>
        </View>
        <Text>{data.createdDate}</Text>
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
  }
});

export default Item;
