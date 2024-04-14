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
    updateUserInfoAction_pending: emptyProps(),
    updateUserInfoAction_fulfilled: props<{ payload: IAxiosResponse<IUserInfo> }>(),
    updateUserInfoAction_rejected: props<{ payload: IAxiosResponse<IUserInfo> }>(),

    signInAction_pending: emptyProps(),
    signInAction_fulfilled: props<{ payload: IAxiosResponse<IUserInfo> }>(),
    signInAction_rejected: props<{ payload: IAxiosResponse<IUserInfo> }>(),

    signUpAction_pending: emptyProps(),
    signUpAction_fulfilled: emptyProps(),
    signUpAction_rejected: emptyProps(),

    resetUserInfoAction_fulfilled: emptyProps(),

    deleteUserInfoAction_fulfilled: emptyProps(),

    likeArticleAction_fulfilled: props<{ payload: IAxiosResponse<IArticle> & IAdditionalArticleInfo & ILikeArticleResponse }>(),
  },
});

const updateUserInfoAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: Required<INotificationAction>  & IFormData & INavigateAction & Required<Pick<IArticleRequestData, 'username'>>) => {
  const {openNotification, navigate, formData, ...userInfo} = payload
    UserInfoActionsByReducer.updateUserInfoAction_pending();
    const callNotification = ({type, message}: ICallNotificationAction ) => {
      openNotification({
        content: message,
        type
      })
    }
    const {username, ...dataUserInfo} = userInfo
    const response: IAxiosResponse<IUserInfo> = await api({ method: 'put', url: `user/${username}`, data: formData, headers: { 'Content-Type': 'multipart/form-data'} })
    callNotification({
      type: response.status >= 400 ? 'error' : 'success',
      message: response.status >= 400 ? response.data as unknown as string : `${response.data.username} was updated`
    })
    if(response.status >= 400){
      dispatch(UserInfoActionsByReducer.updateUserInfoAction_rejected({payload: response}));
    }	
    dispatch(UserInfoActionsByReducer.updateUserInfoAction_fulfilled({payload: response}));
};

const savePreviewUserAvatarAction = async (payload: Pick<IUserInfo, 'username'> & IFormData) =>{
  const {formData, username, cb} = payload
  await api({ method: 'put', url: `user/${username}/avatar`, data: formData, headers: { 'Content-Type': 'multipart/form-data'} })
  if(cb){
    cb()
  }
};
  
const deletePreviewUserAvatarAction = async (payload: Pick<IUserInfo, 'username'> & {formData: FormData}) => {
  const {formData,   ...userInfo } = payload
  await api({ method: 'delete', url: `user/${userInfo?.username}/avatar` , data: formData, headers: {  'Content-Type': 'multipart/form-data' } })
};

const signInAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: ISignIn & Required<INotificationAction> & INavigateAction) => {
  const { openNotification, navigate, ...userInfo} = payload
  const callNotification = ({type, message}: ICallNotificationAction ) => {
    openNotification({
      content: message,
      type
    })
  }
  const response = await api({ method: 'post', url: 'auth', data: userInfo })
  if(response.status >= 400){
    callNotification({
      type: 'error',
      message: response.data.message
    })
    dispatch(UserInfoActionsByReducer.signInAction_rejected({payload: response}));
  }	else {
    if(navigate){
      navigate('/')
    }
  }
  if(response?.data?.refresh_token){
    localStorage.setItem('refresh_token', response.data.refresh_token)
  }
  dispatch(UserInfoActionsByReducer.signInAction_fulfilled({payload: response}));
};

const signUpAction = async({dispatch}: {dispatch: Store['dispatch']}, payload: ISignUp & Required<INotificationAction> & Required<INavigateAction>) =>{
  const {openNotification, navigate, ...userInfo} = payload
  const callNotification = ({type, message}: ICallNotificationAction ) => {
    openNotification({
      content: message,
      type
    })
  }
  const response = await api({ method: 'post', url: 'user', data: userInfo })
  callNotification({
    type: response.status >= 400 ? 'error' : 'success',
    message: response.status >= 400 ? response.data.message : `${userInfo.username} was created`
  })
  if(response.status >= 400){
    dispatch(UserInfoActionsByReducer.signInAction_rejected({payload: response}));
  }	else {
    dispatch(UserInfoActionsByReducer.signInAction_fulfilled({payload: response}));
    navigate('/signIn')
  }
};  

const resetUserInfoAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: Required<INavigateAction>) => {
  const { navigate } = payload
  navigate('/')
  localStorage.clear()
  dispatch(UserInfoActionsByReducer.resetUserInfoAction_fulfilled());
};

const deleteUserInfoAction = async({dispatch}: {dispatch: Store['dispatch']}, payload: Pick<IUserInfo, 'username'> & Required<INavigateAction>) => {
  const { navigate, ...userInfo } = payload
  const response = await api({ method: 'delete', url: `user/${userInfo?.username}` })
  navigate('/')
  localStorage.clear()
  dispatch(UserInfoActionsByReducer.deleteUserInfoAction_fulfilled());
};

const likeArticleByUserAction = async({dispatch}: {dispatch: Store['dispatch']}, payload: IAxiosResponse<IUserInfo>) => {
  dispatch(UserInfoActionsByReducer.updateUserInfoAction_fulfilled({payload}));
};
  

export const UserInfoActions = {
  updateUserInfoAction,
  savePreviewUserAvatarAction,
  deletePreviewUserAvatarAction,
  signInAction,
  signUpAction,
  resetUserInfoAction,
  likeArticleByUserAction,
}