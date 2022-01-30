import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'
import {HEADER_TITLE,USER,ERROR_MESSAGE,REST_USER} from './actionType'


const initHeader = '首页'
function headerTitle(state=initHeader,action){
  const {type,data} = action
  switch (type) {
    case HEADER_TITLE:
    return data
    default:
    return state
  }
}
const initUser =storageUtils.getUser()
function user(state=initUser,action){
  const {type,data} = action
 
  switch (type) {
    case USER:
      return data
      case ERROR_MESSAGE:
        return {...state,data}
      case REST_USER:
        return {}
    default:
     return state
  }
}

export default combineReducers({
  headerTitle,
  user
})

