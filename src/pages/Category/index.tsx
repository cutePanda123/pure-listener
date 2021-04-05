import React from 'react';
import {View, Text} from 'react-native';
import {RootState} from '@/models/';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = ({category}: RootState) => {
  return {
    selectedCategories: category.selectedCategories,
    candidateCategories: category.candidateCategories,
  };
};

const connertor = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connertor>
interface IProps extends ModelState {};

class Category extends React.Component {
  render() {
    return (
      <View>
        <Text>Category</Text>
      </View>
    );
  }
}

export default Category;
