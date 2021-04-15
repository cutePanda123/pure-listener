import {create, Model} from 'dva-core-ts';
import models from '@/models/index';
import creatLoading from 'dva-loading-ts';
import modelExtend from 'dva-model-extend';
import homeModel from '@/models/home';

// 1. create a dva instance
const app = create();

// 2. load model objects
models.forEach((model) => {
  app.model(model);
});

// 3. add a plugin to dva
app.use(creatLoading());

// 4. start dva
app.start();

// 4. export dva
export default app._store;

interface ModelCache {
  [key: string]: boolean;
}

const modelCache: ModelCache = {
  home: true,
};

function registerModel(model: Model) {
  if (!modelCache[model.namespace]) {
    app.model(model);
    modelCache[model.namespace] = true;
  }
}

export function createHomeModel(namespace: string) {
  const model = modelExtend(homeModel, {namespace});
  registerModel(model);
}
