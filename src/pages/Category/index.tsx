import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import CategoryItem from './CategoryItem';

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
    const categoryGroup = _.groupBy(
      candidateCategories,
      (category) => category.category,
    );

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My categories</Text>
        <View style={styles.items}>
          {selectedCategories.map(this.renderCategoryItem)}
        </View>
        <Text style={styles.title}>All categories</Text>
        <View style={styles.items}>
          {Object.keys(categoryGroup).map((category) => {
            return (
              <View key={category}>
                <Text style={styles.title}>{category}</Text>
                <View>
                  {categoryGroup[category].map(this.renderCategoryItem)}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  renderCategoryItem = (category: ICategory, idx: number) => {
    return <CategoryItem data={category} />;
  };
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
    marginLeft: 10,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default connector(Category);
