import {ICategory} from '@/models/category';
import {viewPortWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  data: ICategory;
}

const containerDivWidth = viewPortWidth - 10;
const categoryItemWidth = containerDivWidth / 4;

class CategoryItem extends React.Component<IProps> {
  render() {
    const {data} = this.props;
    return (
      <View key={data.id} style={styles.itemWrapper}>
        <View style={styles.item}>
          <Text>{data.name}</Text>
        </View>
      </View>
    );
  }
}

export default CategoryItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: categoryItemWidth,
    height: 48,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flex: 1,
    borderRadius: 4,
    margin: 5,
  },
});
