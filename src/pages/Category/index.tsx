import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import CategoryItem from './CategoryItem';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

const mapStateToProps = ({category}: RootState) => {
  return {
    selectedCategories: category.selectedCategories,
    candidateCategories: category.candidateCategories,
    isEditMode: category.isEditMode,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
}
interface IState {
  selectedCategories: ICategory[];
}

class Category extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCategories: props.selectedCategories,
    };
    props.navigation.setOptions({
      headerRight: () => {
        return <HeaderRightBtn onEditModeChange={this.onEditModeChange} />;
      },
    });
  }

  onEditModeChange = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/toggleEditMode',
    });
  };

  render() {
    const {candidateCategories} = this.props;
    const {selectedCategories} = this.state;
    const categoryGroup = _.groupBy(
      candidateCategories,
      (category) => category.category,
    );
    console.log('category group: ', categoryGroup);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My categories</Text>
        <View style={styles.items}>
          {selectedCategories.map(this.renderSelectedCategoryItem)}
        </View>
        <Text style={styles.title}>All categories</Text>
        <View>
          {Object.keys(categoryGroup).map((category) => {
            return (
              <View key={category}>
                <Text style={styles.title}>{category}</Text>
                <View style={styles.items}>
                  {categoryGroup[category].map(
                    this.renderUnselectedCategoryItem,
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  renderSelectedCategoryItem = (category: ICategory, idx: number) => {
    const {isEditMode} = this.props;
    return (
      <CategoryItem
        key={category.id}
        data={category}
        isEditMode={isEditMode}
        isSelected={true}
      />
    );
  };

  onPressUnselectedCategoryItem = (category: ICategory, idx: number) => {
    const {isEditMode} = this.props;
    if (!isEditMode) {
      return;
    }
    const {selectedCategories} = this.state;
    this.setState({
      selectedCategories: [...selectedCategories, category],
    });
  }

  renderUnselectedCategoryItem = (category: ICategory, idx: number) => {
    const {isEditMode} = this.props;
    return (
      <Touchable key={category.id} 
      onPress={() => this.onPressUnselectedCategoryItem(category, idx)}
      onLongPress={this.onLongPressCategoryItem}>
        <CategoryItem
          key={category.id}
          data={category}
          isEditMode={isEditMode}
          isSelected={false}
        />
      </Touchable>
    );
  };

  onLongPressCategoryItem = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEditMode: true,
      },
    });
  }

  componentWillUnmount = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEditMode: false,
      },
    });
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
    marginLeft: 10,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default connector(Category);
