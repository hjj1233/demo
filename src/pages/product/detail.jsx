import React, { Component } from 'react';
import {List,Card} from 'antd'
import {ArrowRightOutlined,ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button';
import { BASE_URL } from '../../utils/constant';
import { reqCategoryId } from '../../api';
import './index.css'
const {Item} = List

class Detail extends Component {

  state = {
    cName1:'',
    cName2:''
  }

async  componentDidMount() {
  const {categoryId,pCategoryId} = this.props.location.state
  console.log(this.props)
  
  if(pCategoryId ==='0') {
    const res = await reqCategoryId(categoryId)
    this.setState({cName1:res.data.name})
  }else {
   const res=await Promise.all([ reqCategoryId(categoryId),reqCategoryId(pCategoryId)])
   const cName1=res.data[0].name
   const cName2=res.data[1].name
   this.setState({
    cName1,
    cName2
   })
  }
}

  render() {
    console.log(this.props,this.props.history.location.state)
    const {categoryId,desc,detail,imgs,name,pCategoryId,_id,price} = this.props.history.location.state
   const {cName1,cName2} = this.state
    this.html = {__html:detail}
    this.data = [
 `<span className='left'>商品名称：<span>联想ThinkPad翼480</span></span>`
  
]
    const title = (
            <>
            <LinkButton onClick={()=>this.props.history.goBack()}>  <ArrowLeftOutlined /> &nbsp;</LinkButton>
            <span>商品详情</span>
            {/* <div dangerouslySetInnerHTML={{_html:'<h1>1231</h1>'}}></div> */}
            </>    
    )
    return (
      <Card  title={title}>
       <List split text='left' >
         <Item>
           <span className='left'>商品名称：</span>
           {name}
         </Item>
         <Item>
           <span className='left'>商品描述：</span>
           {desc}
         </Item>
         <Item>
           <span className='left'>商品价格：</span>
          {price}
         </Item>
         <Item>
           <span className='left'>所属分类：</span>
       {cName1} {cName2 ? '-->' + cName2:''}
         </Item>
         <Item>
           <span className='left'>商品图片：
          {
            imgs.map(item=>{
              return (
                <>
                <img src={BASE_URL+item} alt="images" />
                </>
              )
            })
          }
          </span>
         </Item>
         <Item>
           <div className='left'>商品详情： <span dangerouslySetInnerHTML={this.html} /></div>
         
         </Item>
         
       </List>
      </Card>
    );
  }
}

export default Detail;