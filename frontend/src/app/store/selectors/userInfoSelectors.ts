import { createSelector } from "@ngrx/store"
import { AppState } from "../types"

const getUserInfoFeature = (state: AppState) => {
  return state.userInfo
}

export const getUserInfo = (state: AppState) => createSelector(getUserInfoFeature, (userInfo: AppState['userInfo']) => userInfo['data'])