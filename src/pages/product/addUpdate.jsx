import React, { Component } from 'react';
import {Card,Form,Input,Button,Cascader, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button';
import {reqCategorys} from '../../api'
import PicturesWall from './pictures-wall';
import RichTextEditor from './rich-text-editor';
const {Item} =Form
const {TextArea} = Input

const optionLists = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];



class AddUpdate extends Component {

  state = {
    options:optionLists
  }

constructor(props) {
  super(props)
  this.pw = React.createRef()
}

  showPrice = (rule, value, callback) =>{
    if(value<=0) {
      callback('输入的数值不能小于0')
    }else {
      callback()
    }
  }
  onFinish = (e)=>{
    const  imgs=this.pw.current.getImag()
      console.log({...e,imgs})
      // console.log(this.pw.current)
      message.success('提交成功')
  }

  getData =async (data)=>{
   const options= data.map(item=>{
      return {value:item._id,label:item.name,isLeaf: false}
    })
    //如果是一个二级分类商品的更新
    const {isUpdate,product} =this
    const {pCategoryId,categorysId} = product 
    if(isUpdate && pCategoryId !==0) {
      //获取对应的二级分类列表
      const subCategorys =await this.getCategorys(pCategoryId)
      //生成二级下拉列表的options
      const childSubCategorys = subCategorys.map(item=>{
        return {value:item._id,label:item.name,isLeaf: true}
      })
      //找到当前商品对应的一级option对象
      const targetOption = options.find(()=>  options.value === pCategoryId)
      //关联对应的一级option上
      targetOption.children = childSubCategorys
    }

    this.setState({options:options})
  }
  getCategorys=async (parentId)=>{
    const res = await reqCategorys(parentId)
    if(res.status === 0 ) {
      const data = res.data
      if(parentId ==='0') {
        
        this.getData(data)
      }else {
        //获取二级列表 Promise
        return data
      }
    }
  }
  
    //  onChange = (value, selectedOptions) => {
    //   console.log(value, selectedOptions);
    // };

    loadData =async selectedOptions => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true; 
     //根据选中的分类，请求获取二级分类列表
      const subCategorys = await this.getCategorys(targetOption.value)
      targetOption.loading = false; 
      if(subCategorys && subCategorys.length > 0) {
        //获取二级分类
       const childSubCategorys = subCategorys.map(item=>{
         return {value:item._id,label:item.name,isLeaf: true}
        })
      //关联二级分类
        targetOption.children = childSubCategorys
      }else {
          targetOption.isLeaf = true
      }

      this.setState({options:[...this.state.options]})

      // console.log(targetOption.value)
    }
componentDidMount(){
  this.getCategorys('0')
}


componentWillMount() {
  //取出携带的state
  const product = this.props.history.location.state
  //保存是否是更新的标识
 this.isUpdate = !!product
 // 保存商品
 this.product = product || {}
 console.log('hujiajia')
  console.log(product)
}

  render() {
    const {isUpdate,product} =this
    const {pCategoryId,categorysId,imgs} = product 
    //用来接收级联分类ID的数组
    const categorysIds = []
    if(isUpdate) {
      // 商品是一个一级分类的商品
      if(pCategoryId === '0') {
        categorysIds.push(pCategoryId)
      }else {
        // 商品是一个二级分类的商品
        categorysIds.push(pCategoryId)
        categorysIds.push(categorysId)
      }
    }

    const title = (
      <LinkButton onClick={()=>this.props.history.goBack()} >
        <ArrowLeftOutlined />&nbsp;
       {isUpdate ? '修改商品' : '添加商品'}
      </LinkButton>
    )
    return (
      <Card title={title}>
       <Form   wrapperCol={{ span: 8 }} onFinish={this.onFinish}>
            <Item label='商品名称' name='name' initialValue={product.name} rules={[{required:true,message:'请输入商品名称'}]}>
              <Input placeholder='请输入商品名称' />
            </Item>
            <Item label='商品描述' name='describe' initialValue={product.desc} rules={[{required:true,message:'请输入商品描述'}]}>
              <TextArea placeholder='请输入商品描述'  />
            </Item>
            <Item label='商品价格' name='price' initialValue={product.price} rules={
              [{required:true,message:'请输入商品价格'},
             { validator:this.showPrice}
              ]}>
              <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
            </Item>
            {/* <Item label='商品分类' name='classify' initialValue={categorysIds}  rules={[{required:true,message:'请输入商品分类'}]}>
            <Cascader options={this.state.options} loadData={this.loadData} onChange={this.onChange} changeOnSelect />
            </Item> */}
            <Item label='商品图片' >
           <PicturesWall ref={this.pw} imgs={imgs} />
            </Item>
            <Item label='商品详情' >
           {/* <RichTextEditor /> */}
            </Item>
            <Item>
              <Button type='primary' htmlType="submit" >提交</Button>
            </Item>
       </Form>
      </Card>
    );
  }
}

export default AddUpdate;