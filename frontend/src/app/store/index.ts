import { articleReducer } from '@app/store/reducers/articleReducer'; 
import { otherAuthorInfoReducer } from '@app/store/reducers/otherAuthorInfoReducer'; 
import { userInfoReducer } from '@app/store/reducers/userInfoReducer'; 



export default {
  article: articleReducer,
  otherAuthorInfo: otherAuthorInfoReducer,
  userInfo: userInfoReducer,
}