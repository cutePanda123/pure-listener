import { resolvePlugin } from '@babel/core';
import {Effect, Model} from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';

const CAROUSEL_IMAGE_ENDPOINT = '/mock/29/carousel';

export interface ICarouselImage {
    id: string;
    imageURL: string;
    colors: [string, string],
    real_image: string,
};

export interface HomeState {
    carouselImages: ICarouselImage[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
      setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarouselImages: Effect;
  };
}

const initialState: HomeState = {
    carouselImages: [],
};

const homeModel: HomeModel = {
    namespace: 'home',
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *fetchCarouselImages(_, {call, put}) {
            const {data, state, msg} = yield call(axios.get, CAROUSEL_IMAGE_ENDPOINT);
            console.log('carousel images data: ', data);
            yield put({
                type: 'setState',
                payload: {
                    carouselImages: data,
                },
            });
        }
    }
}

export default homeModel;