import React, { Component } from 'react';
import {Form,Select,Input,Modal} from 'antd'
import { reqAddOrUpdateUserList } from '../../api';
const {Item}=Form
const {Option}=Select
class UserForm extends Component {

  formRef = React.createRef()

getFormData  = ()=>{
 const users=  this.formRef.current.getFieldsValue(true)
 
   return users
}
initValue = ()=>{
  this.formRef.current.resetFields()
}
componentWillUnmount(){
  
}
getFormUpdate = ()=>{
  const users = this.props.users || {}
  this.formRef.current.setFieldsValue({
    username: users.username ,
    phone:users.phone,
    email:users.email,
    _id:users.role_id
  });

}
componentDidMount() {
 
 
}

  render() {
   const {roles,users} = this.props
    return (
      <Form
          on={this.onFinish} 
         ref={this.formRef}
          labelCol={{ span: 4 }}
          // wrapperCol={{ span: 16 }}
         >
          <Item name='username'  label='用户名' rules={[{required:true}]}>
            <Input placeholder='请输入用户名称'/>
          </Item>
         {
           users ? '': <Item name='password' label='密码' rules={[{required:true}]}>
           <Input placeholder='请输入密码'/>
         </Item>
         }
          <Item name='phone' label='手机号' rules={[{required:true}]}>
            <Input placeholder='请输入手机号码'/>
          </Item>
          <Item name='email' label='邮箱' rules={[{required:true}]}>
            <Input placeholder='请输入邮箱'/>
          </Item>
          <Item name='_id' label='角色' rules={[{required:true}]}>
            <Select  placeholder='请选择'>
              {
                roles.map((item)=>{
                  return  <Option key={item._id} value={item._id}>{item.name}</Option>
                })
              }
             
            
            </Select>
          </Item>
      </Form>
    );
  }
}

export default UserForm;