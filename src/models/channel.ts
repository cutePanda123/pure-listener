import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const CHANNEL_DETAIL_DATA_URL = '/mock/11/channeldetail';

interface IProgram {
  id: string;
  title: string;
  playTimes: number;
  duration: string;
  createdDate: string;
}

interface IAuthor {
  name: string;
  avatar: string;
}

export interface IChannelDetailState {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  introduction: string;
  author: IAuthor;
  list: IProgram[];
}

export interface ChannelDetailModel extends Model {
  namespace: 'channelDetail';
  state: IChannelDetailState;
  effects: {
    fetchChannelDetail: Effect;
  };
  reducers: {
    setState: Reducer<IChannelDetailState>;
  };
}

const initialState: IChannelDetailState = {
  id: '',
  thumbnailUrl: '',
  title: '',
  summary: '',
  list: [],
  introduction: '',
  author: {
    name: '',
    avatar: '',
  },
};

const channelDetailModel: ChannelDetailModel = {
  namespace: 'channelDetail',
  state: initialState,
  effects: {
    *fetchChannelDetail({payload}, {call, put}) {
      const {data} = yield call(axios.get, CHANNEL_DETAIL_DATA_URL);
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default channelDetailModel;
