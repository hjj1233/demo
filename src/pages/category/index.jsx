import React, { Component } from 'react';
import {Card,Button,Table, message,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import {PlusOutlined ,ArrowRightOutlined} from '@ant-design/icons'
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api'
import AddFrom from '../../components/AddFrom';
import UpdateFrom from '../../components/UpdateFrom';

class Category extends Component {

  state = {
    categorysDate:[],
    loadingStatus:false,
    parenId:'0',
    subCategorysDate:[],
    parenName:'',
    addStatus:false,
    updateStatus:false,
    updateValue:{}

  }

  getColumns = ()=>{
    this.columns = [
      { 
        title: '分类名称',
         dataIndex: 'name', 
         key: 'name' ,
         width:'70%'
        },  
      {
        title: '操作',
        dataIndex: 'option',
        key: 'option',
        width:'30%',
        render: (_,obj) => {
          return<>
          <LinkButton onClick={()=>this.updateCategorysDate(obj)}>修改分类</LinkButton>
         {
           this.state.parenId == 0 ?
           <LinkButton onClick={()=>this.subCategorysDate(obj)}>查看子分类</LinkButton>:null
         }
          </>
        }
      },
    ];
  }
  getData = () =>{
    this.data1=[
      {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed647f352726338607047",
        "name": "分类2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5c2ed64cf352726338607048",
        "name": "1分类3",
        "__v": 0
      }
     
    ]
    this.data2=[
      {
        "parentId": "5c2ed64cf352726338607048",
        "_id": "5c2ed65df352726338607049",
        "name": "分类3333",
        "__v": 0
      },
      {
        "parentId": "5c2ed64cf352726338607048",
        "_id": "5c2ed66ff35272633860704a",
        "name": "分类34",
        "__v": 0
      }
    ]
  }
  getCategorys =async () =>{
    // this.setState({loadingStatus:true})
    const {parenId,subCategorysDate,categorysDate} = this.state
    const CategorysDate =await reqCategorys(parenId)
    this.setState({loadingStatus:false})
    // const parenId =await  this.data1[0]
    // console.log(parenId.parenId)
    if(parenId =='0') {
      this.setState({categorysDate: this.data1})
    }else {
      this.setState({categorysDate:this.data2 })
    }

  //  if(CategorysDate.parenId === 0) {
  //    this.setState({categorysDate: this.data1})
  //  }else {
  //   this.setState({categorysDate:subCategorysDate })
  //  }
  }
  showCategorys= () =>{
    const {parenId} = this.state
    this.setState({
      parenId:'0',
      parenName:'',
      subCategorysDate:[],
      categorysDate:this.data1
    },()=>{
      console.log(this.state)
    })
  }
  subCategorysDate = (obj) =>{
    const {parenId,parenName} = this.state
    console.log(obj)
    this.setState({
      parenId:obj._id,
      parenName:obj.name
    },()=>{
      this.getCategorys()
    })

  }
  handleCancel = ()=>{
    this.setState({addStatus:false})
    this.setState({updateStatus:false})
  }
  addCategorysDate = ()=>{
    this.setState({addStatus:true})
  }

  updateCategorysDate =async (obj)=>{
    // const {updateValue} =this.state
    this.setState({updateStatus:true})
    this.categoryName = obj.name
    this.cetegoryId = obj._Id
    console.log(this.categoryName)
    // const res =await reqUpdateCategory({cetegoryId:obj.categoryId,categoryName:updateValue})
      // this.categoryName = updateValue
      // this.setState({
      //   subCategorysDate:res.data
      // })
    
  }

updateHandleOk = ()=>{
  this.handleValue()
  message.success('修改成功')
  this.setState({updateStatus:false})
}
addHandleOk = ()=>{
  this.addHandleValue()
  message.success('添加成功')
  this.setState({addStatus:false})
}
addHandleValue =async (value1,value2)=>{
  const res=await reqAddCategory({categoryName:value2,parenId:value1})
  if(res.status == 0) {
    if(value1 ==this.props.parentId) {
      this.getCategorys()
    }else if(value1=='0') {
      this.getCategorys('0')
    }
  }
}
handleValue =async (value) =>{
const {updateValue} = this.state
 this.setState({
   updateValue:value
 },async ()=>{
  const cetegoryId = this.cetegoryId
  const categoryName = updateValue
  const res = await reqUpdateCategory({cetegoryId,categoryName})
  console.log(res)
if(res.status == 1) {
  this.getCategorys()
}

 })



}

componentWillMount (){
  this.getColumns()
  this.getData()
}
componentDidMount() {
  this.getCategorys()
}
  render() {
const {categorysDate,loadingStatus,parenId,parenName,addStatus,updateStatus,updateValue} = this.state
    const extra = (
    <Button type='primary' onClick={this.addCategorysDate} >
    <PlusOutlined />
     新建
     </Button>)
      
      const categoryName=  this.categoryName || {}
    return (
     
      <div>
    <Card title={
      parenId == 0 ? '分页列表' : <span>
        <LinkButton onClick={this.showCategorys}>分页列表</LinkButton>
        <ArrowRightOutlined />&nbsp;
        <span>{parenName}</span>
      </span>
    } extra={extra} >
    <Table
    bordered
    rowKey='_id'
    pagination={{
      defaultPageSize:5
    }}
    loading={loadingStatus}
    columns={this.columns}
    dataSource={categorysDate}
  />
    </Card>
    <Modal title="添加列表" okText='确认' cancelText='取消' visible={addStatus} onOk={this.addHandleOk} onCancel={this.handleCancel}>
      <AddFrom  categorysDate={categorysDate} parenId={parenId} addHandleValue={this.addHandleValue}/>
      </Modal>
      <Modal title="更新列表"  okText='确认' cancelText='取消' visible={updateStatus} onOk={this.updateHandleOk} onCancel={this.handleCancel}>
       <UpdateFrom 
       updateName= { this.categoryName} 
       categoryName={categoryName}
        updateValue={updateValue} 
        handleValue={this.handleValue}  
        setForm={form=>this.form=form}
         />
      </Modal>
      </div>
    );
  }
}

export default Category;