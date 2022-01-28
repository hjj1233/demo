import React, { Component,useRef ,} from 'react';
import {Form,Select,Input, Button} from 'antd'
const {Item}=Form

class UpdateFrom extends Component {
  // this.props.updateValue({name:e.target.value})

  
  onFinish = (e)=>{
    // const a = this.InputValue.value
    const {updateValue,handleValue} =this.props
    handleValue({name:e.target.value})
        // console.log( e.target.value)
        // return (e)=>{
        // }
  }
  componentDidMount() {
     console.log('已经渲染',this.props.categoryName)
    // this.props.setForm(this.props.form)
    // console.log(this.props.form)
    // const {updateValue} = this.state
  }
  // componentWillMount() {
  //   console.log('准备卸载',this.props.categoryName)
  // }

  render() {
    const {categoryName} =this.props
    // const [form] = Form.useForm();
    // console.log(form)
 
    return (
    <Form initialValues={categoryName}> 
          <Item 
          name='name'
          // initialValue={categoryName}
          rules={[
            {
              required:true,
              message:'请输入分类名称'
            }
          ]} 
          >
            <Input placeholder='请输入分类名称' onChange={this.onFinish}  />
          </Item>
      </Form>
    );
  }
}

export default UpdateFrom;