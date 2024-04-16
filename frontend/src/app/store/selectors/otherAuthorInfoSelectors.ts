import { createSelector } from "@ngrx/store"
import { AppState } from "../types"

const getOtherAuthorInfoFeature = (state: AppState) => {
  return state.otherAuthorInfo
}

export const getOtherAuthorInfo = (state: AppState) => createSelector(getOtherAuthorInfoFeature, (otherAuthorInfo: AppState['otherAuthorInfo']) => otherAuthorInfo['data'])