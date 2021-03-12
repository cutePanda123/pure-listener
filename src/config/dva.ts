import { create } from 'dva-core-ts';
import models from '@/models/index';
import creatLoading from 'dva-loading-ts';

// 1. create a dva instance
const app = create();

// 2. load model objects
models.forEach(model => {
    app.model(model);
})

// 3. add a plugin to dva
app.use(creatLoading());

// 4. start dva
app.start();

// 4. export dva
export default app._store;