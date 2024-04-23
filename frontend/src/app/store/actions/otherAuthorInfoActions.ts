import { Store, createActionGroup, emptyProps, props } from '@ngrx/store';
import { 
  IAxiosResponse,
  INavigateAction,
  INotificationAction,
  IUserInfo,
  IOtherAuthorInfo
} from '@app/store/types';
import api from '@app/store/api/api';

export const OtherAuthorInfoActionsByReducer = createActionGroup({
  source: 'OtherAuthorInfo',
  events: {
    getOtherAuthorInfoAction: props<{ payload: Pick<IOtherAuthorInfo, 'username'> & INotificationAction & INavigateAction }>(),
    getOtherAuthorInfoAction_rejected: props<{ payload: IAxiosResponse<IOtherAuthorInfo> }>(),
    getOtherAuthorInfoAction_fulfilled: props<{ payload: IAxiosResponse<IOtherAuthorInfo> }>(),
  },
});
