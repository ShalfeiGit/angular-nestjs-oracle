import { Store, createActionGroup, emptyProps, props } from '@ngrx/store';
import { 
  IArticle,
  IAxiosResponse,
  IGroupArticle,
  IArticleRequestData,
  IUserArticle,
  ITagOption,
  IAdditionalArticleInfo,
  IAxiosErrorResponse,
  IPaginationInfo,
  INotification,
  INavigateAction,
  INotificationAction,
  ICallNotificationAction
} from '@app/store/types';
import api from '@app/store/api/api';
// import { UserInfoActions } from './userInfoEffects';
import { ArticleActionsByReducer } from '../actions/articleActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { EMPTY, catchError, from, map, of, switchMap } from 'rxjs';

// const loadArticleAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: Pick<IArticleRequestData, 'articleId'>) => {
//   const { articleId } = payload
//   dispatch(ArticleActionsByReducer.loadArticleAction_pending())
//   const response: IAxiosResponse<IArticle> & IAxiosErrorResponse = await api({ method: 'get', url: `article/${articleId}` })
//   if(response.status && response.status >= 400){
//     dispatch(ArticleActionsByReducer.loadArticleAction_rejected({payload: response}));
//   }	else {
//     dispatch(ArticleActionsByReducer.loadArticleAction_fulfilled({payload: response}));
//   }
// };

export const loadAllArticlesAction =  createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ArticleActionsByReducer.loadArticleAction),
      switchMap(({payload}) =>{
        const {page, limit} = payload
        debugger
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

// const loadAllArticlesAction = (dispatch: {dispatch: Store['dispatch']}) => async (payload: IPaginationInfo) => {
//   const {page, limit} = payload
//   dispatch(ArticleActionsByReducer.loadAllArticlesAction_pending())
//     const response: IAxiosResponse<IGroupArticle<IArticle>> & IAxiosErrorResponse = await api({ method: 'get', url: `article/global/all?page=${page}&limit=${limit}` })
//     if(response.status && response.status >= 400){
//       dispatch(ArticleActionsByReducer.loadAllArticlesAction_rejected({payload: response}));
//     }	else {
//       dispatch(ArticleActionsByReducer.loadAllArticlesAction_fulfilled({payload: {
//         ...response,
//         data: {
//           tag: 'global',
//           articles: response.data as any
//         }
//       }}));
//     }
// };

// const loadGroupArticlesAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: IPaginationInfo & Required<Pick<IArticleRequestData, "tag">>) => {
//   const {tag, page, limit} = payload
//   dispatch(ArticleActionsByReducer.loadGroupArticlesAction_pending())
//   const response: IAxiosResponse<IGroupArticle<IArticle>> & IAxiosErrorResponse = await api({ method: 'get', url: `article/group/${tag}?page=${page}&limit=${limit}` })
//   if(response.status && response.status >= 400){
//     dispatch(ArticleActionsByReducer.loadGroupArticlesAction_rejected({payload: response}));
//   }	else {
//     dispatch(ArticleActionsByReducer.loadGroupArticlesAction_fulfilled({payload: {
//       ...response,
//       data: {
//         tag,
//         articles: response.data as any
//       }
//     }}));
//   }
// };

// const removeGroupArticlesAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: Required<Pick<IArticleRequestData, "tag">>) => {
//   const { tag } = payload
//   dispatch(ArticleActionsByReducer.removeGroupArticlesAction_fulfilled({payload: {tag} }));
// };

// const loadUserArticlesAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: IPaginationInfo & Required<Pick<IArticleRequestData, "username">>) => {
// 	const { username, page, limit } = payload
//   dispatch(ArticleActionsByReducer.loadUserArticlesAction_pending());
//   const response: IAxiosResponse<IUserArticle<IArticle>> & IAxiosErrorResponse = await api({ method: 'get', url: `article/filter/${username}?page=${page}&limit=${limit}` })
//   if(response.status && response.status >= 400){
//     dispatch(ArticleActionsByReducer.loadUserArticlesAction_rejected({payload: response}));
//   }	else {
//     dispatch(ArticleActionsByReducer.loadUserArticlesAction_fulfilled({payload:  {
//       ...response,
//       data: {
//         username,
//         articles: response.data as any
//       }
//     }}));
//   }
// };

// const loadTagOptionsAction = async ({dispatch}: {dispatch: Store['dispatch']}) => {
//   dispatch(ArticleActionsByReducer.loadTagOptionsAction_pending());
//   const response:IAxiosResponse<ITagOption[]> & IAxiosErrorResponse = await api({ method: 'get', url: 'article/options/tag' })
//   if(response.status && response.status >= 400){
//     dispatch(ArticleActionsByReducer.loadTagOptionsAction_rejected({payload: response}));
//   }	else {
//     dispatch(ArticleActionsByReducer.loadTagOptionsAction_fulfilled({payload: response}));
//   }
// };

// const createArticleAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: INotification & Required<INavigateAction> & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username">>) => {
//   const {username, content, title, tag, navigate, openNotification} = payload
//   dispatch(ArticleActionsByReducer.createArticleAction_pending());
//   const callNotification = ({type, message}: ICallNotificationAction ) => {
//     openNotification({
//       content: message,
//       type
//     })
//   }
//   const response: IAxiosResponse<IArticle> & IAxiosErrorResponse = await api({ method: 'post', url: `article/${username}`, data: {tag, title, content} })
//   callNotification({
//     type: response.status && response.status >= 400 ? 'error' : 'success',
//     message: response.status && response.status >= 400 ? response.data.message : 'Article was created'
//   })
//   if(response.status && response.status >= 400){
//     dispatch(ArticleActionsByReducer.createArticleAction_rejected({payload: response}));
//   }	else {
//     navigate(`/userinfo/${username}?tab=articles-content`)
//     dispatch(ArticleActionsByReducer.createArticleAction_fulfilled({payload: response}));
//   }
// };

// const updateArticleAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: INotification & Required<INavigateAction> & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username" | "articleId">>) => {
//   const {articleId, username, content, title, tag, navigate, openNotification} = payload
//   dispatch(ArticleActionsByReducer.updateArticleAction_pending());
//   const callNotification = ({type, message}: ICallNotificationAction ) => {
//     openNotification({
//       content: message,
//       type
//     })
//   }
//   const response = await api({ method: 'put', url: `article/${articleId}`, data: {tag, title, content} })
//   callNotification({
//     type: response.status >= 400 ? 'error' : 'success',
//     message: response.status >= 400 ? response.data.message : 'Article was updated'
//   })
//   if(response.status >= 400){
//     dispatch(ArticleActionsByReducer.updateArticleAction_rejected({payload: response}));
//   }	else {
//     navigate(`/userinfo/${username}?tab=articles-content`)
//     dispatch(ArticleActionsByReducer.updateArticleAction_fulfilled({payload: response}));
//   }
// };

// const deleteArticleAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: INotification & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username" | "articleId">>) => {
//   const {articleId, openNotification, username} = payload
//   dispatch(ArticleActionsByReducer.deleteArticleAction_pending())
//   const callNotification = ({type, message}: ICallNotificationAction ) => {
//     openNotification({
//       content: message,
//       type
//     })
//   }
//   const response: IAxiosResponse<IUserArticle<IArticle>> & IAxiosErrorResponse = await api({ method: 'delete', url: `article/${articleId}` })
//   const responseUserArticles = await api({ method: 'get', url: `article/filter/${username}?page=1&limit=10` })
//   callNotification({
//     type: response.status && response.status >= 400 ? 'error' : 'success',
//     message: response.status && response.status >= 400 ? response.data.message : 'Article was deleted'
//   })
//   if(response.status && response.status >= 400){
//     dispatch(ArticleActionsByReducer.deleteArticleAction_rejected({payload: response}));
//   }	else {
//     dispatch(ArticleActionsByReducer.deleteArticleAction_fulfilled({payload: response}));
//     loadUserArticlesAction({dispatch}, { username, page: 1, limit : 10 })
//   }
// };

// const likeArticleAction = async ({dispatch}: {dispatch: Store['dispatch']}, payload: INotification & IPaginationInfo & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username" | "articleId">>) => {
//   const {username, articleId, likes, tag, page, limit} = payload
//   const responseUserInfo = await api({ method: 'post', url: `article/like/${articleId}/username/${username}`, data: { likes } })
//   const responseGroupArticles = await api({ method: 'get', url: `article/${tag === 'global' ? 'global/all' : `group/${tag}`}?page=${page}&limit=${limit}` })
//   if(responseUserInfo.status >= 400){
//     dispatch(ArticleActionsByReducer.likeArticleAction_rejected({payload: responseUserInfo}));
//   }	else {
//     UserInfoActions.likeArticleByUserAction({dispatch}, responseUserInfo)
//     dispatch(ArticleActionsByReducer.likeArticleAction_fulfilled({payload: {
//       ...responseGroupArticles,
//       data: { tag,
//         articles: responseGroupArticles.data
//       }
//     }}));
//   }
// };

// export const ArticleActions = {
//   loadArticleAction,
//   loadAllArticlesAction,
//   loadGroupArticlesAction,
//   removeGroupArticlesAction,
//   loadUserArticlesAction,
//   loadTagOptionsAction,
//   createArticleAction,
//   updateArticleAction,
//   deleteArticleAction,
//   likeArticleAction
// }

// export const ArticleActions = {
//   loadAllArticlesAction,
// }