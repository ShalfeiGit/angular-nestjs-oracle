import { createSelector } from "@ngrx/store"
import { AppState } from "../types"

const getArticleFeature = (state: AppState) => {
  return state.article
}

export const getArticleInfo = (state: AppState) => createSelector(getArticleFeature, (article: AppState['article']) => article['data'])
export const getUserArticles = (state: AppState) => createSelector(getArticleFeature, (article: AppState['article']) => article['userArticles'])
export const getTags = (state: AppState) => createSelector(getArticleFeature, (article: AppState['article']) => article['tags'])
export const getGroupArticles  = (state: AppState) => createSelector(getArticleFeature, (article: AppState['article']) => article['groupArticles'])