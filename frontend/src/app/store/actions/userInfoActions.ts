import { Store, createActionGroup, emptyProps, props } from '@ngrx/store';
import { 
  IArticle,
  IAxiosResponse,
  IArticleRequestData,
  IAdditionalArticleInfo,
  INavigateAction,
  INotificationAction,
  ICallNotificationAction,
  IUserInfo,
  ILikeArticleResponse,
  IFormData,
  ISignIn,
  ISignUp
} from '@app/store/types';
import api from '@app/store/api/api';

export const UserInfoActionsByReducer = createActionGroup({
  source: 'UserInfo',
  events: {
    updateUserInfoAction: props<{ payload: Required<INotificationAction>  & IFormData & INavigateAction & Required<Pick<IArticleRequestData, 'username'>>}>(),
    updateUserInfoAction_fulfilled: props<{ payload: IAxiosResponse<IUserInfo> }>(),
    updateUserInfoAction_rejected: props<{ payload: IAxiosResponse<IUserInfo> }>(),

    signInAction: props<{ payload: ISignIn & Required<INotificationAction> & Required<INavigateAction>  }>(),
    signInAction_fulfilled: props<{ payload: IAxiosResponse<IUserInfo> }>(),
    signInAction_rejected: props<{ payload: IAxiosResponse<IUserInfo> }>(),

    signUpAction: props<{ payload: ISignUp & Required<INotificationAction> & INavigateAction }>(),
    signUpAction_fulfilled: props<{ payload: IAxiosResponse<IUserInfo> }>(),
    signUpAction_rejected: props<{ payload: IAxiosResponse<IUserInfo> }>(),
    
    savePreviewUserAvatarAction: props<{ payload: Pick<IUserInfo, 'username'> & IFormData }>(),
    deletePreviewUserAvatarAction: props<{ payload: Pick<IUserInfo, 'username'> & IFormData }>(),

    resetUserInfoAction: props<{ payload: Required<INavigateAction> }>(),
    resetUserInfoAction_fulfilled: emptyProps(),

    deleteUserInfoAction: props<{ payload: Pick<IUserInfo, 'username'> & Required<INavigateAction>}>(),
    deleteUserInfoAction_fulfilled: emptyProps(),

    likeArticleAction: props<{ payload:  IAxiosResponse<IUserInfo>}>(),
    likeArticleAction_fulfilled: props<{ payload: IAxiosResponse<IUserInfo>}>(),
  },
});
