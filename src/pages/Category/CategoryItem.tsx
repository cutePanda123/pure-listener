import {ICategory} from '@/models/category';
import {viewPortWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  data: ICategory;
  isEditMode: boolean;
  isSelected: boolean;
  isPinned: boolean;
}

export const containerDivWidth = viewPortWidth - 10;
export const categoryItemWidth = containerDivWidth / 4;
export const itemHeight = 48;
export const itemMargin = 5;

class CategoryItem extends React.Component<IProps> {
  render() {
    const {data, isEditMode, isSelected, isPinned} = this.props;
    return (
      <View key={data.id} style={styles.itemWrapper}>
        <View style={[styles.item, isEditMode && isPinned && styles.pinnedItem]}>
          <Text>{data.name}</Text>
          {isEditMode && !isPinned && (
            <View style={styles.addOrDeleteIcon}>
              <Text style={styles.iconText}>{isSelected ? '-' : '+'}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default CategoryItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: categoryItemWidth,
    height: itemHeight,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flex: 1,
    borderRadius: 4,
    margin: itemMargin,
  },
  addOrDeleteIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    lineHeight: 16,
  },
  pinnedItem: {
    backgroundColor: '#ccc',
  },
});
