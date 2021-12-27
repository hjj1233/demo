/*
要求:能根据接口文档定义接口请求
包含应用中的所有接口请求函数的模块
每个函数返回值都是promise
*/

import ajax from "./ajax";

const BASE =''

//登录
export const reqLogin = (params) =>{
  console.log('11111')
  return  ajax(BASE +'/login',params,'POST')
}

//添加用户
export const reqAddUser = (user) =>ajax(BASE+'/manage/user/add',user,'POST')