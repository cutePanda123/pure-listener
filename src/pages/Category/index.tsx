import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';
import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import CategoryItem, {
  categoryItemWidth,
  containerDivWidth,
  itemHeight,
  itemMargin,
} from './CategoryItem';
import { RootStackNavigation } from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';
import { DragSortableView } from 'react-native-drag-sort';

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
  scrollEnabled: boolean;
}

const pinnedCategory: number[] = [0, 1];

class Category extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCategories: props.selectedCategories,
      scrollEnabled: true,
    };
    props.navigation.setOptions({
      headerRight: () => {
        return <HeaderRightBtn onEditModeChange={this.onEditModeChange} />;
      },
    });
  }

  onCategoryItemDrag = (data: ICategory[]) => {
    this.setState({
      selectedCategories: data,
    });
  };

  onEditModeChange = () => {
    const {dispatch, isEditMode, navigation} = this.props;
    const {selectedCategories} = this.state;
    dispatch({
      type: 'category/toggleEditMode',
      payload: {
        selectedCategories,
      },
    });
    if (isEditMode) {
      navigation.goBack();
    }
  };

  render() {
    const {candidateCategories, isEditMode} = this.props;
    const {selectedCategories, scrollEnabled} = this.state;
    const categoryGroup = _.groupBy(
      candidateCategories,
      (category) => category.category,
    );
    console.log('category group: ', categoryGroup);

    return (
      <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
        <Text style={styles.title}>My categories</Text>
        <View style={styles.items}>
          <DragSortableView
            dataSource={selectedCategories}
            renderItem={this.renderSelectedCategoryItem}
            sortable={isEditMode}
            keyExtractor={(item) => item.id}
            onDataChange={this.onCategoryItemDrag}
            onDragStart={() => this.setState({scrollEnabled: false})}
            onDragEnd={() => this.setState({scrollEnabled: true})}
            parentWidth={containerDivWidth}
            childrenWidth={categoryItemWidth}
            childrenHeight={itemHeight}
            marginChildrenTop={itemMargin}
            fixedItems={pinnedCategory}
            onClickItem={(data, item) => this.onPressSelectedCategory(data, item)}
          />
        </View>
        <Text style={styles.title}>All categories</Text>
        <View>
          {Object.keys(categoryGroup).map((category) => {
            return (
              <View key={category}>
                <Text style={styles.title}>{category}</Text>
                <View style={styles.items}>
                  {categoryGroup[category].map((candidateCategory, index) => {
                    if (
                      selectedCategories.find(
                        (selectedCategory) =>
                          candidateCategory.id === selectedCategory.id,
                      )
                    ) {
                      return null;
                    }
                    return this.renderUnselectedCategoryItem(
                      candidateCategory,
                      index,
                    );
                  })}
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
    const isPinned = pinnedCategory.indexOf(idx) >= 0;
    return (
      <CategoryItem
        key={category.id}
        data={category}
        isEditMode={isEditMode}
        isPinned={isPinned}
        isSelected={true}
      />
    );
  };

  onPressCategoryItem = (
    category: ICategory,
    idx: number,
    isSelectedItem: boolean,
  ) => {
    const {isEditMode} = this.props;
    if (!isEditMode) {
      return;
    }
    if (pinnedCategory.indexOf(idx) >= 0) {
      return;
    }
    const {selectedCategories} = this.state;
    if (isSelectedItem) {
      this.setState({
        selectedCategories: selectedCategories.filter(
          (selectedCategory) => selectedCategory.id !== category.id,
        ),
      });
    } else {
      this.setState({
        selectedCategories: [...selectedCategories, category],
      });
    }
  };

  renderUnselectedCategoryItem = (category: ICategory, idx: number) => {
    const {isEditMode} = this.props;
    return (
      <Touchable
        key={category.id}
        onPress={() => this.onPressCategoryItem(category, idx, false)}
        onLongPress={this.onLongPressCategoryItem}>
        <CategoryItem
          key={category.id}
          data={category}
          isEditMode={isEditMode}
          isSelected={false}
          isPinned={false}
        />
      </Touchable>
    );
  };

  onPressSelectedCategory = (data: ICategory[], item: ICategory) => {
    this.onPressCategoryItem(item, data.indexOf(item), true);
  }

  onLongPressCategoryItem = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEditMode: true,
      },
    });
  };

  componentWillUnmount = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEditMode: false,
      },
    });
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
