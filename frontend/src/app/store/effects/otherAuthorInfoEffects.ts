// import { Store, createActionGroup, emptyProps, props } from '@ngrx/store';
// import { 
//   IAxiosResponse,
//   INavigateAction,
//   INotificationAction,
//   IUserInfo,
//   IOtherAuthorInfo
// } from '@app/store/types';
// import api from '@app/store/api/api';

// export const OtherAuthorInfoActionsByReducer = createActionGroup({
//   source: 'OtherAuthorInfo',
//   events: {
//     getOtherAuthorInfoAction_pending: emptyProps(),
//     getOtherAuthorInfoAction_rejected: props<{ payload: IAxiosResponse<IOtherAuthorInfo> }>(),
//     getOtherAuthorInfoAction_fulfilled: props<{ payload: IAxiosResponse<IOtherAuthorInfo> }>(),
//   },
// });

// const getOtherAuthorInfoAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: Pick<IOtherAuthorInfo, 'username'> & INotificationAction & INavigateAction) =>{
//   const { username } = payload	
//   const response: IAxiosResponse<IUserInfo> = await api({ method: 'get', url: `user/author/${username}` })
//   if(response.status && response.status >= 400){
//     dispatch(OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction_rejected({payload: response}));
//   }	else {
//     dispatch(OtherAuthorInfoActionsByReducer.getOtherAuthorInfoAction_fulfilled({payload: response}));
//   }
// }

// export const OtherAuthorInfoActions = {
//   getOtherAuthorInfoAction,
// }