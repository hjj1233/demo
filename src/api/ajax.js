/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise 对象
*/

import axios from "axios";
import { message } from "antd";
 
 export default function ajax(url,data={},type='GET') {

  return new Promise((resolve,reject)=>{
    let promise
    if(type === 'GET') {
      //配置对象
      promise= axios.get(url,{
        params:data // 指定请求参数
      })
    }else {
      //发送POST请求
      promise= axios.post(url,data)
    }
    //如果成功。调用resolve(value)
    promise.then(response => {
      resolve(response.data)
      //如果失败，不调用reject(reason)，而是提示异常信息
    }).catch(error => {
      message.error('请求失败',error.message)
    })
  })
   
 }