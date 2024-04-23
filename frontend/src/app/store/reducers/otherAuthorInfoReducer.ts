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
  on(OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction, (state) => {
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
);
