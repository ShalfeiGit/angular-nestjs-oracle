import { createReducer, on } from '@ngrx/store';
import { ArticleActionsByReducer } from '@app/store/actions/articleActions';
import { DynamicObject, IInitialState} from '@app/store/types';

export const initialState: IInitialState = {
  data: null,
  tags: null,
  groupArticles: [],
  userArticles: [],
  error: null,
  loading: false,
  status: null,
  statusText: null,
  headers: null,
  config: null,
};

export const articleReducer = createReducer(
  initialState,
  on(ArticleActionsByReducer.loadArticleAction, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.loadArticleAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      data: {...data, content: `${data?.content}`.split(/\r\n|\n/g)},
      error: null,
      status,
      statusText,
      headers,
      config,
      loading: false,
    };
  }),
  on(ArticleActionsByReducer.loadArticleAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      data: null,
      error: data,
      status,
      statusText,
      headers,
      config,
      loading: false,
    };
  }),
  on(ArticleActionsByReducer.loadAllArticlesAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.loadAllArticlesAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      groupArticles: [
				...(state["groupArticles"] ?? []).filter((groupArticle: DynamicObject) => groupArticle['tag'] !== data.tag),
				{
					tag: data.tag,
					articles: 	{
						items: (data?.articles?.items ?? []).map(article => ({
							...article, 
							content: `${article?.content}`.split(/\r\n|\n/g)
						})),
						meta: data?.articles?.meta,
					}
				}],
        error: null,
        status: status,
        statusText: statusText,
        headers: headers,
        config: config,
        loading: false
    };
  }),
  on(ArticleActionsByReducer.loadAllArticlesAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      groupArticles: null,
      error: data,
      status: status,
      statusText: statusText,
      headers: headers,
      config: config,
      loading: false
    };
  }),
  on(ArticleActionsByReducer.loadGroupArticlesAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.loadGroupArticlesAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config} = action.payload
    return {
      groupArticles: [
        ...(state['groupArticles'] ?? []).filter((groupArticle: DynamicObject) => groupArticle['tag'] !== data.tag),
        {
          tag: data.tag,
          articles: 	{
            items: (data?.articles?.items ?? []).map(article => ({
              ...article, 
              content: `${article?.content}`.split(/\r\n|\n/g)
            })),
            meta: data?.articles?.meta,
          }
        }],
      error: null,
      status: status,
      statusText: statusText,
      headers: headers,
      config: config,
      loading: false  
    }
  }),
  on(ArticleActionsByReducer.loadGroupArticlesAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      groupArticles: null,
      error: data,
      status: status,
      statusText: statusText,
      headers: headers,
      config: config,
      loading: false
    };
  }),
  on(ArticleActionsByReducer.removeGroupArticlesAction_fulfilled, (state, action) => {
    const { tag }  = action.payload
    return {...state, groupArticles: [
      ...(state['groupArticles'] ?? []).filter((groupArticle: DynamicObject) => groupArticle['tag'] !== tag),
    ] };
  }),
  on(ArticleActionsByReducer.loadUserArticlesAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.loadUserArticlesAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      ...state,
      userArticles: [
        ...(state['userArticles'] ?? []).filter((userArticle: DynamicObject) => userArticle['username'] !== data.username),
        {
          username: data.username,
          articles: 	{
            items: (data?.articles?.items ?? []).map(article => ({
              ...article, 
              content: `${article?.content}`.split(/\r\n|\n/g)
            })),
            meta: data?.articles?.meta,
          }
        }],
      error: null,
      status: status,
      statusText: statusText,
      headers: headers,
      config: config,
      loading: false
    };
  }),
  on(ArticleActionsByReducer.loadUserArticlesAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config}  = action.payload
    return {
      userArticles: null,
      error: data,
      status: status,
      statusText: statusText,
      headers: headers,
      config: config,
      loading: false
    }
  }),
  on(ArticleActionsByReducer.loadTagOptionsAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.loadTagOptionsAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
      tags: data,
			error: null,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config,
			loading: false
    };
  }),
  on(ArticleActionsByReducer.loadUserArticlesAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
      tags: null,
			error: data,
			loading: true,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config
    };
  }),
  on(ArticleActionsByReducer.createArticleAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.createArticleAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
      data: {...data,	content: `${data?.content}`.split(/\r\n|\n/g)},
			error: null,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config,
			loading: false,
    };
  }),
  on(ArticleActionsByReducer.createArticleAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
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
  on(ArticleActionsByReducer.updateArticleAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.updateArticleAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
      data: {...data, content: `${data?.content}`.split(/\r\n|\n/g)},
      error: null,
      status: status,
      statusText: statusText,
      headers: headers,
      config: config,
      loading: false
    };
  }),
  on(ArticleActionsByReducer.updateArticleAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
      tags: null,
			error: data,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config, 
			loading: false
      };
  }),
  on(ArticleActionsByReducer.deleteArticleAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.deleteArticleAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
      data: null,
			userArticles: [
				...(state['userArticles'] ?? []).filter((userArticle: DynamicObject) => userArticle['username'] !== data.username),
				{
					username: data.username,
					articles: 	{
						items: (data?.articles?.items ?? []).map(article => ({
							...article, 
							content: `${article?.content}`.split(/\r\n|\n/g)
						})),
						meta: data?.articles?.meta,
					}
				}],
			error: null,
			status: status,
			statusText: statusText,
			headers: headers,
			config: config,
			loading: false
    };
  }),
  on(ArticleActionsByReducer.deleteArticleAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
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
  on(ArticleActionsByReducer.likeArticleAction_pending, (state) => {
    return {...state, loading: true };
  }),
  on(ArticleActionsByReducer.likeArticleAction_fulfilled, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
      error: null,
			groupArticles: [
				...(state['groupArticles'] ?? []).filter((groupArticle: DynamicObject)  => groupArticle['tag'] !== data.tag),
				{
					tag: data.tag,
					articles: 	{
						items: (data?.articles?.items ?? []).map(article => ({
							...article, 
							content: `${article?.content}`.split(/\r\n|\n/g)
						})),
						meta: data?.articles?.meta,
					}
				}],
			status: status,
			statusText: statusText,
			headers: headers,
			config: config,
			loading: false
    };
  }),
  on(ArticleActionsByReducer.likeArticleAction_rejected, (state, action) => {
    const {data, status, statusText, headers, config }  = action.payload
    return {
      ...state,
        groupArticles: [],
        error: data,
        status: status,
        statusText: statusText,
        headers: headers,
        config: config,
        loading: false
      };
  }),
);

