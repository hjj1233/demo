/*
要求:能根据接口文档定义接口请求
包含应用中的所有接口请求函数的模块
每个函数返回值都是promise
*/

import { message } from "antd";
import axios from "axios";
import jsonp from "jsonp";
import ajax from "./ajax";

const BASE =''

//登录
export const reqLogin = (params) =>{
  console.log('11111')
  return  ajax(BASE +'/login',params,'POST')
}

//添加用户
export const reqAddUser = (user) =>ajax(BASE+'/manage/user/add',user,'POST')

//获取一级/二级分类列表
export const reqCategorys = (parenId) => ajax(BASE + '/manage/category/list',{parenId},'GET')

//添加分类
export const reqAddCategory = (categoryName,parenId)=>ajax(BASE + '/manage/category/add',{categoryName,parenId},'POST')

//更新分类
export const reqUpdateCategory = ({cetegoryId,categoryName})=>ajax(BASE + '/manage/category/update',{cetegoryId,categoryName},'POST')

//获取一级，二级列表
export const reqCategoryId= (cetegoryId)=>ajax(BASE + '/manage/category/info',{cetegoryId},'GET')
//商品分列表
export const reqProduct = ({pageNumber,pageSize})=>ajax(BASE + '/manage/product/list',{pageNumber,pageSize})

//商品搜索
export const reqProductSelect = ({searchType,pageSize,pageNumber,searchName})=>ajax(BASE + '/manage/product/search',{[searchType]:searchName,pageSize,pageNumber,})

//对商品进行上架/下架处理
export const reqUpdateStatus = (productId,status)=>ajax(BASE + '/manage/product/updateStatus',{productId,status},'POST')

//删除上传图片
export const reqDelete = (name)=>ajax(BASE + '/manage/img/delete',{name},'POST')


//获取所有角色列表

export const reqRoleData = ()=>ajax(BASE + '/manage/role/list')

//添加角色

export const reqAddRoleData = (roleName)=>ajax(BASE + '/manage/role/add',{roleName },'POST')


//更新角色权限

export const reqAddRoleUpdate = (role)=>ajax(BASE + '/manage/role/update',role,'POST')

//获取用户列表

export const reqUsers = ()=>ajax(BASE + '/manage/user/list','GET')

//删除指定用户

export const reqDeleteUser = (user_id)=>ajax(BASE + '/manage/user/delete',{user_id},'POST')

//添加用户

export const reqAddOrUpdateUserList = (users)=>ajax(BASE + `/manage/user/`+(users._id?'update':'add'),users,'POST')


//jsonp 天气

export const reqWeather = (city)=>{
  const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=E4805d16520de693a3fe707cdc962045`
  return new Promise((resolve,reject)=>{
    jsonp(url,{},(err,data)=>{
//如果成功
if(!err && data.status==='success') {
  //取出需要的数据
  const {dayPictureUrl,weather} = data.results[0].weather_data[0]
  console.log(data)
  resolve({dayPictureUrl,weather})
}else {
  //如果失败
  message.error('获取天气失败')
}
    })
  })
}