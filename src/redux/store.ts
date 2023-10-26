import {createStore} from 'redux';
import languageReducer from "./language/languageReducer";

const store = createStore(languageReducer)

//类型定义使用type关键字来声明，store类型名称一般来说叫做RootState,数据类型可以从store的getState中获得
//而对于typeof store.getState 可以通过类型的反向注入，使用ReturnType来从泛型中获得返回类型
export type RootState = ReturnType<typeof store.getState>

export default store
