import { createReducer, on } from '@ngrx/store';
import { IInitialState } from '@app/store/types';
import { UserInfoActionsByReducer } from '../actions/userInfoActions';
import { OtherAuthorInfoActionsByReducer } from '../actions/otherAuthorInfoActions';

export const initialState: IInitialState = {
  data: null,
  error: null,
  loading: false,
  status: null,
  statusText: null,
  headers: null,
  config: null,
};

export const otherAuthorInfoReducer = createReducer(
  initialState,
  on(OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      data: data,
			error: null,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config,
			loading: false
    };
  }),
  on(OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      data: null,
			error: data,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config, 
			loading: false
    };
  }),
  on(UserInfoActionsByReducer.signInAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(UserInfoActionsByReducer.signInAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    let updatedDate
    if(data?.refresh_token){
      const {refresh_token, ...payloadUpdatedDate}  = data
      updatedDate = payloadUpdatedDate
    } else {
      updatedDate = data
    }  
    return {
      ...state,
      data: updatedDate,
			error: null,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config,
			loading: false
    };
  }),
  on(UserInfoActionsByReducer.signInAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      data: null,
			error: data,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config,
			loading: false
    };
  }),
  on(UserInfoActionsByReducer.signUpAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(UserInfoActionsByReducer.signUpAction_fulfilled, (state) => {
    return {...state, loading: false };
  }),
  on(UserInfoActionsByReducer.signUpAction_rejected, (state) => {
    return {...state, loading: false };
  }),
  on(UserInfoActionsByReducer.resetUserInfoAction_fulfilled, (state) => {
    return {
      ...state,
      data: null,
			error: null,
			loading: false,
			status: null,
			statusText: null,
			headers: null,
			config: null
    };
  }),
  on(UserInfoActionsByReducer.deleteUserInfoAction_fulfilled, (state) => {
    return {
      ...state,
      data: null,
			error: null,
			loading: false,
			status: null,
			statusText: null,
			headers: null,
			config: null
    };
  }),
  on(UserInfoActionsByReducer.likeArticleAction_fulfilled, (state, action) => {
    const {user}  = action.payload;
    return {
      ...state,
      data: user,
			error: null,
			loading: false
    };
  }),
);
