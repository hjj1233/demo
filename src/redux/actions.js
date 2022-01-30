import {reqLogin} from '../api'
import { HEADER_TITLE,USER,ERROR_MESSAGE,REST_USER } from "./actionType";
import storageUtils from '../utils/storageUtils'


export const setHeaderTitle = (data)=>({type:HEADER_TITLE,data}) //同步标题

export const setUserObj = (data)=>({type:USER,data}) //用户信息

export const setErrorMessage = (data)=>({type:ERROR_MESSAGE,data}) //错误信息


export const loginOut = ()=>({type:REST_USER})

export const login = (users)=>{
  return async (dispatch) =>{
    const result = await reqLogin(users)
    if(result.status == 0) {
      const user = result.data
      //储存用户信息
      storageUtils.setUser(user)
      dispatch(setUserObj(user))
    }else {
      //监听错误的信息
      dispatch(setErrorMessage(result.msg))
    }
  }
}

