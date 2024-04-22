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
} from '@app/store/types';

export const ArticleActionsByReducer = createActionGroup({
  source: 'Article',
  events: {
    loadArticleAction: props<{ payload: IPaginationInfo }>(),
    loadArticleAction_fulfilled: props<{ payload: IAxiosResponse<IArticle> }>(),
    loadArticleAction_rejected: props<{ payload: IAxiosResponse<IArticle> }>(),

    loadAllArticlesAction_pending: emptyProps(),
    loadAllArticlesAction_fulfilled: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(), 
    loadAllArticlesAction_rejected: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(),

    loadGroupArticlesAction_pending: emptyProps(),
    loadGroupArticlesAction_fulfilled: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(),
    loadGroupArticlesAction_rejected: props<{ payload: IAxiosResponse<IGroupArticle<IArticle>> }>(),

    removeGroupArticlesAction_fulfilled: props<{payload: IArticleRequestData}>(),

    loadUserArticlesAction_pending: emptyProps(),
    loadUserArticlesAction_fulfilled: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),
    loadUserArticlesAction_rejected: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),

    loadTagOptionsAction_pending: emptyProps(),
    loadTagOptionsAction_fulfilled: props<{payload: IAxiosResponse<ITagOption[]>}>(),  
    loadTagOptionsAction_rejected: props<{payload: IAxiosResponse<ITagOption[]>}>(),

    createArticleAction_pending: emptyProps(),
    createArticleAction_fulfilled: props<{payload: IAxiosResponse<IArticle>}>(), 
    createArticleAction_rejected: props<{payload: IAxiosResponse<IArticle>}>(), 

    updateArticleAction_pending: emptyProps(),
    updateArticleAction_fulfilled: props<{payload: IAxiosResponse<IArticle> & IAdditionalArticleInfo}>(), 
    updateArticleAction_rejected: props<{payload: IAxiosResponse<IArticle> & IAdditionalArticleInfo}>(), 

    deleteArticleAction_pending: emptyProps(),
    deleteArticleAction_fulfilled: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),
    deleteArticleAction_rejected: props<{payload: IAxiosResponse<IUserArticle<IArticle>>}>(),
    
    likeArticleAction_pending: emptyProps(),
    likeArticleAction_fulfilled: props<{payload: IAxiosResponse<IGroupArticle<IArticle>>}>(),
    likeArticleAction_rejected: props<{payload: IAxiosResponse<IGroupArticle<IArticle>>}>(),
  },
});
