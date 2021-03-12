import home, {HomeState} from './home';
import { DvaLoadingState } from 'dva-loading-ts';

const models = [home];

export type RootState = {
    home: HomeState;
    loading: DvaLoadingState;
}

export default models;