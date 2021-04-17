import home, {HomeState} from './home';
import { DvaLoadingState } from 'dva-loading-ts';
import category, {CategoryModelState} from './category';
import channelDetail from './channelDetail';

const models = [home, category, channelDetail];

export type RootState = {
    home: HomeState;
    category: CategoryModelState;
    loading: DvaLoadingState;
    channelDetail: typeof channelDetail.state;
} & {
    [key: string]: typeof home.state;
};

export default models;