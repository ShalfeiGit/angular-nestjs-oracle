import { createSelector } from "@ngrx/store"
import { AppState } from "../types"

const getArticleFeature = (state: AppState) => {
  return state.article
}

export const getArticleInfo = createSelector(getArticleFeature, (article: AppState['article']) => article['data'])
export const getUserArticles =  createSelector(getArticleFeature, (article: AppState['article']) => article['userArticles'])
export const getTags = createSelector(getArticleFeature, (article: AppState['article']) => article['tags'])
export const getGroupArticles  = createSelector(getArticleFeature, (article: AppState['article']) => article['groupArticles'])