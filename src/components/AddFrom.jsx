import React, { Component } from 'react';
import {Form,Select,Input} from 'antd'
const {Item}=Form
const {Option}=Select
class AddFrom extends Component {
  addObject =(changedFields, allFields)=>{
  
    this.props.addHandleValue(allFields[0].value,allFields[1].value)
    console.log(allFields[0].value,allFields[1].value)
  }
  render() {
    const {parenId,categorysDate,addHandleValue} = this.props
console.log(categorysDate)
    
    return (
      <Form onFieldsChange={(changedFields, allFields)=>this.addObject(changedFields, allFields)} >
        <Item name='select'>
          <Select defaultValue={parenId} >
            <Option value='0'>一级分类</Option>
           {
             categorysDate.map(item=>{
             return <Option key={item._id} value={item._id}>{item.name}</Option>
             })
           }s
          </Select>
          </Item>
          <Item name='name'>
            <Input placeholder='请输入分类名称'/>
          </Item>
      
      </Form>
    );
  }
}

export default AddFrom;