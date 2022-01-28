import React, { Component } from 'react';
import {Form,Select,Input,Modal} from 'antd'
import { reqAddRoleData } from '../../api';
const {Item}=Form
const {Option}=Select
class AddFrom extends Component {



  addObject =(changedFields,allFields)=>{
  
    this.props.addHandleValue(allFields[0].value,allFields[1].value)
    console.log(allFields[0].value)

 
  }
  onFinish = ()=>{
   this.validateMessages= {
      required:'请输入角色名称'
    }
  }


  render() {
    const {parenId,categorysDate,addHandleValue} = this.props
console.log(categorysDate)
    return (
      <Form on={this.onFinish}   onFieldsChange={(changedFields, allFields)=>this.addObject(changedFields, allFields)} >
          <Item name='auth_name' label='角色名称' rules={[{required:true}]}>
            <Input placeholder='请输入角色名称'/>
          </Item>
      </Form>
    );
  }
}

export default AddFrom;