import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { 
  IArticle,
  IAxiosResponse,
  IGroupArticle,
  IArticleRequestData,
  IUserArticle,
  ITagOption,
  IAdditionalArticleInfo,
  IPaginationInfo,
  INotification,
  INavigateAction,
  INotificationAction,
} from '@app/store/types';

export const ArticleActionsByReducer = createActionGroup({
  source: 'Article',
  events: {
    loadArticleAction: props<{ payload: IArticleRequestData }>(),
    loadArticleAction_fulfilled: props<{ payload: IAxiosResponse<IArticle> }>(),
    loadArticleAction_rejected: props<{ payload: IAxiosResponse<IArticle> }>(),

    loadAllArticlesAction: props<{ payload: IPaginationInfo }>(),
    loadAllArticlesAction_fulfilled: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(), 
    loadAllArticlesAction_rejected: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(),

    loadGroupArticlesAction: props<{ payload: IArticleRequestData & IPaginationInfo }>(),
    loadGroupArticlesAction_fulfilled: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(),
    loadGroupArticlesAction_rejected: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(),

    removeGroupArticlesAction: props<{ payload: IArticleRequestData }>(),
    removeGroupArticlesAction_fulfilled: props<{payload: IArticleRequestData}>(),

    loadUserArticlesAction: props<{ payload: IArticleRequestData & IPaginationInfo }>(),
    loadUserArticlesAction_fulfilled: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),
    loadUserArticlesAction_rejected: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),

    loadTagOptionsAction: emptyProps(),
    loadTagOptionsAction_fulfilled: props<{payload: IAxiosResponse<ITagOption[]>}>(),  
    loadTagOptionsAction_rejected: props<{payload: IAxiosResponse<ITagOption[]>}>(),

    createArticleAction:  props<{ payload: INotification & Required<INavigateAction> & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username">>}>(), 
    createArticleAction_fulfilled: props<{payload: IAxiosResponse<IArticle>}>(), 
    createArticleAction_rejected: props<{payload: IAxiosResponse<IArticle>}>(), 

    updateArticleAction: props<{ payload: INotification & Required<INavigateAction> & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username" | "articleId">>}>(), 
    updateArticleAction_fulfilled: props<{payload: IAxiosResponse<IArticle> & IAdditionalArticleInfo}>(), 
    updateArticleAction_rejected: props<{payload: IAxiosResponse<IArticle> & IAdditionalArticleInfo}>(), 

    deleteArticleAction: props<{ payload: INotification & Required<INavigateAction> & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username" | "articleId">>}>(),
    deleteArticleAction_fulfilled: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),
    deleteArticleAction_rejected: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),
    
    likeArticleAction: props<{ payload: INotification & IPaginationInfo & Required<INotificationAction> & IArticle & Required<Pick<IArticleRequestData, "username" | "articleId">>}>(),
    likeArticleAction_fulfilled: props<{payload: IAxiosResponse<IGroupArticle<IArticle>>}>(),
    likeArticleAction_rejected: props<{payload: IAxiosResponse<IGroupArticle<IArticle>>}>(),
  },
});
