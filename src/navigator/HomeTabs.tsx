import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import {StyleSheet} from 'react-native';
import TopTabBarWrapper from '@/pages/Views/TopTabBarWrapper';
import {RootState} from '../models';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';

const Tab = createMaterialTopTabNavigator();

const mapStateToProps = ({category}: RootState) => {
  return {
    selectedCategories: category.selectedCategories,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class HomeTabs extends React.Component<IProps> {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };

  renderHeaderTabs = (item: ICategory) => {
    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{
          tabBarLabel: item.name,
        }}
      />
    );
  };

  render() {
    const {selectedCategories} = this.props;
    return (
      <Tab.Navigator
        lazy={true}
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainer}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 150,
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#f86442',
          },
          activeTintColor: '#f86442',
          inactiveTintColor: '#333',
        }}>
        {selectedCategories.map(this.renderHeaderTabs)}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default connector(HomeTabs);
