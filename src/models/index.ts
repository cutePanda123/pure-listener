import home, {HomeState} from './home';
import { DvaLoadingState } from 'dva-loading-ts';
import category, {CategoryModelState} from './category';
import channel from './channel';

const models = [home, category, channel];

export type RootState = {
    home: HomeState;
    category: CategoryModelState;
    loading: DvaLoadingState;
    channel: typeof channel.state;
} & {
    [key: string]: typeof home.state;
};

export default models;