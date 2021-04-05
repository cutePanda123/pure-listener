import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootState} from '@/models/';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';
import { viewPortWidth } from '@/utils/';

const mapStateToProps = ({category}: RootState) => {
  return {
    selectedCategories: category.selectedCategories,
    candidateCategories: category.candidateCategories,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {}
interface IState {
  selectedCategories: ICategory[];
}

const containerDivWidth = viewPortWidth - 10;
const categoryItemWidth = containerDivWidth / 4;

class Category extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCategories: props.selectedCategories,
    };
  }
  render() {
    const {candidateCategories} = this.props;
    const {selectedCategories} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My categories</Text>
        <View style={styles.items}>
            {selectedCategories.map(this.renderCategoryItem)}
        </View>
        <Text style={styles.title}>All categories</Text>
        <View style={styles.items}>
            {candidateCategories.map(this.renderCategoryItem)}
        </View>
      </View>
    );
  }

  renderCategoryItem = (category: ICategory, idx: number) => {
      return (
          <View key={category.id} style={{
              width: categoryItemWidth,
              backgroundColor: '#fff',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              flex: 1,
          }}>
            <Text>{category.name}</Text>
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6f6',
    },
    title: {
        fontSize: 16,
        marginTop: 14,
        marginBottom: 8,
    },
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },
});

export default connector(Category);
