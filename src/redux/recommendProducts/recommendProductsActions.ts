import {ThunkAction} from 'redux-thunk'
import {RootState} from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START" //开始调用recommend api

export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS" //recommend api 调用成功

export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL" //recommend api 调用失败

interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductAction =
    FetchRecommendProductStartAction
    | FetchRecommendProductSuccessAction
    | FetchRecommendProductFailAction


export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductSuccessActionCreator = (data: any): FetchRecommendProductSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}


export const fetchRecommendProductFailActionCreator = (
    error: any
): FetchRecommendProductFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error,
    };
};

// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
/**
 * 1. 第一个是当前函数的返回值R，代表return，定义最终输出类型，
 * 不过giveMeDataActionCreator是个返回函数的类型，所以最终输出是void，也就是没有任何数据输出
 *
 * 2.第二个参数S比较简单，指的是StoreState，需要输入的是我们store的类型，也就是rootstate
 *
 * 3. 第三个参数E，代表extra，定义action中额外的参数，不过我们没参数，所以是unknow，或者也可以写undefined。
 *
 * 4. 最后一个A，就是action，直接使用混合aciton类型RecommendProductAction就可以了
 */
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductAction> =>
    async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartActionCreator())
        try {
            const {data} = await axios.get(
                "http://82.157.43.234:8080/api/productCollections"
            )
            dispatch(fetchRecommendProductSuccessActionCreator(data))
        } catch (e) {
            if (e instanceof Error)
                dispatch(fetchRecommendProductFailActionCreator(e.message))
        }
    }





