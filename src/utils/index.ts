import {Dimensions} from 'react-native';

const {
    width: viewPortWidth,
    height: viewPortHeight,
} = Dimensions.get('window');

const wp = (percentage: number) => {
    return Math.round((percentage * viewPortWidth) / 100);
}

const hp = (percentage: number) => {
    return Math.round((percentage * viewPortHeight) / 100);
}

export {viewPortWidth, viewPortHeight, wp, hp};