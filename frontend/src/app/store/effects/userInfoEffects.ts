import api from '@app/store/api/api';
import { OtherAuthorInfoActionsByReducer } from '../actions/otherAuthorInfoActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { concatMap, from, map, of, switchMap, tap } from 'rxjs';
import { UserInfoActionsByReducer } from '../actions/userInfoActions';
import { ICallNotificationAction } from '@app/store/types';
import { Store } from '@ngrx/store';

export const updateUserInfoAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.updateUserInfoAction),
      switchMap(({payload}) =>{
        const {openNotification, navigate, formData, ...userInfo} = payload
        const {username, ...dataUserInfo} = userInfo
        return from(api({ method: 'put', url: `user/${username}`, data: formData, headers: { 'Content-Type': 'multipart/form-data'} })).pipe(
          map((response) => {
            const callNotification = ({type, message}: ICallNotificationAction ) => {
              openNotification({
                content: message,
                type
              })
            }
            callNotification({
              type: response.status && response.status >= 400 ? 'error' : 'success',
              message: response.status && response.status >= 400 ? response.data.message : 'Article was deleted'
            })
            if(response.status >= 400){
              return UserInfoActionsByReducer.updateUserInfoAction_rejected({payload: response})
            }	
            return UserInfoActionsByReducer.updateUserInfoAction_fulfilled({payload: response})
          })
        )
      })
    );
  },
  { functional: true }
);

export const savePreviewUserAvatarAction = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.savePreviewUserAvatarAction),
      switchMap(({payload}) =>{
        const {formData, username, cb} = payload
        return from(api({ method: 'put', url: `user/${username}/avatar`, data: formData, headers: { 'Content-Type': 'multipart/form-data'} })).pipe(
          tap(() => {
            if(cb){
              cb()
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const deletePreviewUserAvatarAction = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.deletePreviewUserAvatarAction),
      switchMap(({payload}) =>{
        const {formData,   ...userInfo } = payload
        return from(api({ method: 'delete', url: `user/${userInfo?.username}/avatar` , data: formData, headers: {  'Content-Type': 'multipart/form-data' } }))
      })
    );
  },
  { functional: true }
);

export const signInAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.signInAction),
      switchMap(({payload}) =>{
        const { openNotification, navigate, ...userInfo} = payload
        return from(api({ method: 'post', url: 'auth', data: userInfo })).pipe(
          switchMap((response) => {
            const callNotification = ({type, message}: ICallNotificationAction ) => {
              openNotification({
                content: message,
                type
              })
            }
            if(response.status >= 400){
              callNotification({
                type: 'error',
                message: response.data.message
              })
              return of(UserInfoActionsByReducer.signInAction_rejected({payload: response}))
            }	else {
              return of(UserInfoActionsByReducer.signInAction_fulfilled({payload: response})).pipe(
                tap(() => {
                  if(navigate){
                    navigate('/')
                  }
                  if(response?.data?.refresh_token){
                    localStorage.setItem('refresh_token', response.data.refresh_token)
                  }
                })
              )
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const signUpAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.signInAction),
      switchMap(({payload}) =>{
        const {openNotification, navigate, ...userInfo} = payload
        return from(api({ method: 'post', url: 'user', data: userInfo })).pipe(
          switchMap((response) => {
            const callNotification = ({type, message}: ICallNotificationAction ) => {
              openNotification({
                content: message,
                type
              })
            }
            callNotification({
              type: response.status >= 400 ? 'error' : 'success',
              message: response.status >= 400 ? response.data.message : `${userInfo.username} was created`
            })
            if(response.status >= 400){
              return of(UserInfoActionsByReducer.signUpAction_rejected({payload: response}));
            }	else {
              return of(UserInfoActionsByReducer.signUpAction_fulfilled({payload: response})).pipe(
                tap(() => {
                  navigate('/signIn')
                }),
              )
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const resetUserInfoAction = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.resetUserInfoAction),
      switchMap(({payload}) =>{
        const { navigate } = payload
        return of(UserInfoActionsByReducer.resetUserInfoAction_fulfilled()).pipe(
          tap(() => {
            navigate('/');
            localStorage.clear();
          })
        )
      })
    );
  },
  { functional: true }
);

export const deleteUserInfoAction = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.deleteUserInfoAction),
      switchMap(({payload}) =>{
        const { navigate, username } = payload
        return from(api({ method: 'delete', url: `user/${username}`}))
        .pipe(
          switchMap((response) => {
            return of(UserInfoActionsByReducer.deleteUserInfoAction_fulfilled()).pipe(
              tap(() => {
                navigate('/')
                localStorage.clear()
              })
            )
          })
        )
      })
    );
  },
  { functional: true }
);

export const likeArticleByUserAction = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(UserInfoActionsByReducer.likeArticleAction),
      map(({payload}) =>{
        return UserInfoActionsByReducer.updateUserInfoAction_fulfilled({payload})
      })
    );
  },
  { functional: true }
);
