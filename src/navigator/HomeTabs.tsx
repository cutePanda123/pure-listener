import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.Component {
    render() {
        return (
            <Tab.Navigator
                lazy={true}
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
                }}
            >
                <Tab.Screen name='Home' component={Home} options ={{ 
                    tabBarLabel: 'Recommendation',
                }}/>
                <Tab.Screen name='Home1' component={Home} />
                <Tab.Screen name='Home2' component={Home} />
            </Tab.Navigator>
        )
    }
}

export default HomeTabs;