import React, { Component } from 'react';
import { Form, Input, Button, Checkbox ,message} from 'antd';
import {UserOutlined,UnlockOutlined} from "@ant-design/icons"
import {Redirect} from 'react-router-dom'

import {reqLogin} from '../../api/index'

import Logo from '../../asstes/images/logo512.png'
import './login.less'

import memoryUtils from '../../utils/memoryUtils'
import localStorage from '../../utils/storageUtils'



class Login extends Component {

onFinish =async (e)=>{
 


  const res= await reqLogin(e)
  const loginData= res.data
  if(res.status === 0) {
    console.log('登录',res.data)
    message.success('登录成功')
    localStorage.setUser(loginData)
    this.props.history.replace('/')
   
  }else {
    message.error(res.msg)
  }
   

// reqLogin({username,password}).then(response=>{
//   if(response.status === 0) {
//     console.log(response.data)
//     message.success('登录成功')
//   }else {
//     message.error('用户名或密码不正确')
//   }
// }).catch(reject=>{
//   console.log('请求数据失败',reject.error)
// })
}

validatorPro = (rule,value,callback)=>{
  // console.log(value,callback,rule)
  if(!value) {
  return  Promise.reject('请输入密码')
  }else if (value.length<4) {
    return Promise.reject('密码长度不能小于4位')
  }else if (value.length>12) {
    return Promise.reject('密码长度不能大于12位')
  }else if (value===undefined) {
    return Promise.reject('密码长度不能为空')
  }
  else {
    return  Promise.resolve()
  }
}
  render() {
    const user = memoryUtils.user
    if(user && user._id) {
       return   <Redirect to='/' />
    }
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={Logo} alt='logo' />
          <h1>React项目：后台管理系统</h1>  
           </header>
       <section className='login-content'>
          <h2>用户登录</h2>
        <div>
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
         
          },
          {
            min:4,
            message:'用户名至少4位',
         
          },
          {
            max:12,
            message:'用户名最多12位'
          },
          {
            pattern:/^[a-zA-Z0-9_]+$/,
            message:'用户名必须是英文、数字或下或下划线组成',
            whitespace:true
          }
        ]}
      >
        <Input prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}} /> } placeholder= '用户名'/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            validator:this.validatorPro,
            whitespace:true,
            // message:'密码不能为空'
          },
        ]}
      >
        <Input.Password prefix={<UnlockOutlined   style={{color:'rgba(0,0,0,.25)'}} /> } placeholder='密码'  />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          // offset: 8,
          // span: 10,
        }}
      >
        <Button type="primary" htmlType="submit" style={{width:'100%'}}>
          登录
        </Button>
      </Form.Item>
    </Form>
        </div>
       </section>
      </div>
    );
  }
}

export default Login;