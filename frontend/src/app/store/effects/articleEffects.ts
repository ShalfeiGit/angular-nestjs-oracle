import { Store } from '@ngrx/store';
import { ICallNotificationAction } from '@app/store/types';
import api from '@app/store/api/api';
import { ArticleActionsByReducer } from '../actions/articleActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { concatMap, from, map, of, switchMap, tap } from 'rxjs';
import { UserInfoActionsByReducer } from '../actions/userInfoActions';

export const loadArticleAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.loadArticleAction),
      switchMap(({payload}) =>{
        const { articleId } = payload
        return from(api({ method: 'get', url: `article/${articleId}` })).pipe(
          map((response) => {
            if(response.status >= 400){
              return ArticleActionsByReducer.loadArticleAction_rejected({ payload: response })
            }	else {
              return ArticleActionsByReducer.loadArticleAction_fulfilled({ payload: response})
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const loadAllArticlesAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.loadAllArticlesAction),
      switchMap(({payload}) =>{
        const {page, limit} = payload
        return from(api({ method: 'get', url: `article/global/all?page=${page}&limit=${limit}`})).pipe(
          map((response) => {
            if(response.status >= 400){
              return ArticleActionsByReducer.loadAllArticlesAction_rejected({ payload: response })
            }	else {
              return ArticleActionsByReducer.loadAllArticlesAction_fulfilled({ payload: {...response, data: {tag: 'global' , articles: response.data }}})
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const loadGroupArticlesAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.loadGroupArticlesAction),
      switchMap(({payload}) =>{
        const {tag, page, limit} = payload
        return from(api({ method: 'get', url: `article/group/${tag}?page=${page}&limit=${limit}` })).pipe(
          map((response) => {
            if(response.status >= 400){
              return ArticleActionsByReducer.loadAllArticlesAction_rejected({ payload: response })
            }	else {
              return ArticleActionsByReducer.loadAllArticlesAction_fulfilled({ payload: {...response, data: {tag, articles: response.data }}})
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const removeGroupArticlesAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.removeGroupArticlesAction),
      map(({payload}) =>{
        const { tag } = payload
        return ArticleActionsByReducer.removeGroupArticlesAction_fulfilled({payload: {tag} })
      })
    );
  },
  { functional: true }
);

export const loadUserArticlesAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.loadUserArticlesAction),
      switchMap(({payload}) =>{
        const { username, page, limit } = payload
        return from(api({ method: 'get', url: `article/filter/${username}?page=${page}&limit=${limit}` })).pipe(
          map((response) => {
            if(response.status >= 400){
              return ArticleActionsByReducer.loadUserArticlesAction_rejected({ payload: response })
            }	else {
              return ArticleActionsByReducer.loadUserArticlesAction_fulfilled({ payload: {...response, data: {username, articles: response.data }}})
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const loadTagOptionsAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.loadTagOptionsAction),
      switchMap(() =>{
        return from(api({ method: 'get', url: 'article/options/tag' })).pipe(
          map((response) => {
            if(response.status >= 400){
              return ArticleActionsByReducer.loadTagOptionsAction_rejected({ payload: response })
            }	else {
              return ArticleActionsByReducer.loadTagOptionsAction_fulfilled({ payload: response })
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const createArticleAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.createArticleAction),
      switchMap(({payload}) =>{
        const {username, content, title, tag, navigate, openNotification} = payload
        return from(api({ method: 'post', url: `article/${username}`, data: {tag, title, content} })).pipe(
          concatMap((response) => {
            const callNotification = ({type, message}: ICallNotificationAction ) => {
              openNotification({
                content: message,
                type
              })
            }
            callNotification({
              type: response.status && response.status >= 400 ? 'error' : 'success',
              message: response.status && response.status >= 400 ? response.data.message : 'Article was created'
            })
            if(response.status >= 400){
              return of(ArticleActionsByReducer.createArticleAction_rejected({payload: response}))
            }	else {
              return of(ArticleActionsByReducer.createArticleAction_fulfilled({payload: response})).pipe(
                tap(() => { navigate(`/userinfo/${username}?tab=articles-content`)})
              )
            }
          }),
        )
      })
    );
  },
  { functional: true }
);

export const updateArticleAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.updateArticleAction),
      switchMap(({payload}) =>{
        const {articleId, username, content, title, tag, navigate, openNotification} = payload
        return from(api({ method: 'put', url: `article/${articleId}`, data: {tag, title, content} })).pipe(
          concatMap((response) => {
            const callNotification = ({type, message}: ICallNotificationAction ) => {
              openNotification({
                content: message,
                type
              })
            }
            callNotification({
              type: response.status && response.status >= 400 ? 'error' : 'success',
              message: response.status && response.status >= 400 ? response.data.message : 'Article was updated'
            })
            if(response.status >= 400){
              return of(ArticleActionsByReducer.updateArticleAction_rejected({payload: response}))
            }	else {
              return of(ArticleActionsByReducer.updateArticleAction_fulfilled({payload: response})).pipe(
                tap(() => { navigate(`/userinfo/${username}?tab=articles-content`) })
              )
            }
          })
        )
      })
    );
  },
  { functional: true }
);

export const deleteArticleAction =  createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.deleteArticleAction),
      switchMap(({payload}) =>{
        const {articleId, openNotification, username} = payload
        return from(api({ method: 'delete', url: `article/${articleId}` })).pipe(
          concatMap((response) => {
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
              return of(ArticleActionsByReducer.updateArticleAction_rejected({payload: response}))
            }	else {
              return of(ArticleActionsByReducer.updateArticleAction_fulfilled({payload: response})).pipe(
                tap(() => store.dispatch(ArticleActionsByReducer.loadUserArticlesAction({payload: { username: username, page: 1, limit : 10 }})))
              )
            }
          })
        )
      })
    );
  },
  { functional: true }
);


export const likeArticleAction = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.likeArticleAction),
      switchMap(({payload}) =>{
        const {username, articleId, likes, tag, page, limit} = payload
        return from(api({ method: 'post', url: `article/like/${articleId}/username/${username}`, data: { likes } })).pipe(
          tap((response) => store.dispatch(UserInfoActionsByReducer.likeArticleAction({payload: response}))),
          concatMap((response) => {
            if(response.status >= 400){
              return of(ArticleActionsByReducer.likeArticleAction_rejected({payload: response}))
            }	else {
              return from(api({ method: 'get', url: `article/${tag === 'global' ? 'global/all' : `group/${tag}`}?page=${page}&limit=${limit}` })).pipe(
                map(response => ArticleActionsByReducer.likeArticleAction_fulfilled({payload: { ...response, data: { tag, articles: response.data }}})))
            }
          })
        )
      })
    );
  },
  { functional: true }
);
