import React from 'react';
import {View, Text} from 'react-native';
import { Route, SceneRendererProps, TabView } from 'react-native-tab-view';
import Introduction from './Introduction';
import MediaList from './MediaList';

interface IRoute {
    title: string;
    key: string;
};

class Tab extends React.Component {
    state = {
        index: 1,
        routes: [
            {key: 'introduction', title: 'introduction'},
            {key: 'channels', title: 'titles'}
        ],
    }

    onIndexChange = (indxe: number) => {
        this.setState({
            indxe,
        });
    }

    renderScene = ({route}: {
        route: IRoute;
    }) => {
        switch (route.key) {
            case 'introduction':
                return <Introduction />;
            case 'channels':
                return <MediaList />
        }
        return null;
    }

    render() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={this.onIndexChange}
                // @ts-expect-error
                renderScene={this.renderScene}
            >
                <Text>Tab</Text>
            </TabView>
        );
    }
};

export default Tab;