import { createSelector } from "@ngrx/store"
import { AppState } from "../types"

const getOtherAuthorInfoFeature = (state: AppState) => {
  return state.otherAuthorInfo
}

export const getOtherAuthorInfo = createSelector(getOtherAuthorInfoFeature, (otherAuthorInfo: AppState['otherAuthorInfo']) => otherAuthorInfo['data'])