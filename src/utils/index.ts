import { NavigationState } from '@react-navigation/native';
import {Dimensions} from 'react-native';

const {
    width: viewPortWidth,
    height: viewPortHeight,
} = Dimensions.get('window');

const wp = (percentage: number) => {
    return Math.round((percentage * viewPortWidth) / 100);
};

const hp = (percentage: number) => {
    return Math.round((percentage * viewPortHeight) / 100);
};

function getActiveRouteName(state: NavigationState) {
    let route;
    route = state.routes[state.index];
    while (route.state && route.state.index) {
        route = route.state.routes[route.state.index];
    }
    return route.name;
};

export {viewPortWidth, viewPortHeight, wp, hp, getActiveRouteName};