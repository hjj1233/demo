import React, { Component } from 'react';
import {Card,Table,Button,Modal, message} from 'antd'
import {reqUsers,reqDeleteUser,reqAddOrUpdateUserList} from '../../api'
import {CON_NUMBER,} from '../../utils/constant'
import moment from 'moment'
import LinkButton from '../../components/link-button'
import UserForm from './userForm';

class User extends Component {
  fd = React.createRef()
state = {
  isShow:false,
  userList:[]
}
//提交数据
addHandleOk=async ()=>{
    const users = this.fd.current.getFormData()
    // this.fd.current.initValue()
console.log(this.users==null)
    if(this.users!==null){
      users._id = this.users._id
    }

    const result =await reqAddOrUpdateUserList(users)
    console.log(users)
    if(result.status==0){
      message.success(`${this.users!==null ? '修改':'添加'}成功`)
      this.setState({
        isShow:false
      })
    }else {
      message.error('添加失败')
       this.setState({
        isShow:false
      })
    }
}
//取消
handleCancel=()=>{
  this.setState({
    isShow:false
  })
}
//创建用户

createUser = ()=>{
  this.users=null
  this.setState({
    isShow:true
  },()=>{
    this.fd.current.initValue()
  })
}
getData =async ()=>{
    const result = await reqUsers()
    if(result.status ==0) {
      const {roles,users} = result.data
      // this.roleName(roles)
      this.roleName(this.data.data.roles)
    }
}
roleName = (roles)=>{
  const roleName= roles.reduce((pre,role)=>{
    pre[role._id]=role.name
    console.log(pre)
    return pre
  },{})
  this.roleName=roleName
}

onUpdate = (record)=>{
  this.users=record
  this.setState({
    isShow:true
  },()=>{
    this.fd.current.getFormUpdate()
  })
}

onDelete=(user)=>{
Modal.confirm({
    title: `您确定要删除${user.username}吗？`,
    okText:'确认',
    cancelText:'取消',
    onOk:async ()=> {
     const result = await reqDeleteUser(user._id)
     if(result.status==0){
       message.success('删除成功')
     }else {
       message.error('删除失败')
     }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

componentWillMount() {
 
  this.columns = [
    {
      title:'用户名',
      dataIndex:'username'
    },
    {
      title:'邮箱',
      dataIndex:'email',
    },
    {
      title:'电话',
      dataIndex:'phone',
    },
    {
      title:'注册时间',
      dataIndex:'create_time',
      render:(dom,recoder)=>{
        return <span>{moment(dom).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title:'所属角色',
      dataIndex:'role_id',
      render:(role_id)=>this.roleName[role_id]
    },
    {
      title:'操作',
      dataIndex:'option',
      render:(_,record)=>{
          return <>
          <span>
            <LinkButton onClick={()=>{this.onUpdate(record)}}>修改</LinkButton>
            <LinkButton onClick={()=>this.onDelete(record)}>删除</LinkButton>
          </span>
          </>
      }
    }

  ]
  this.data = {
    "status": 0,
    "data": {
      "users": [
        {
          "_id": "5cb05b4db6ed8c44f42c9af2",
          "username": "test",
          "password": "202cb962ac59075b964b07152d234b70",
          "phone": "123412342134",
          "email": "sd",
          "role_id": "5ca9eab0b49ef916541160d4",
          "create_time": 1555061581734,
          "__v": 0
        },
        {
          "_id": "5cb05b69b6ed8c44f42c9af3",
          "username": "ss22",
          "password": "123",
          "phone": "23343",
          "email": "df",
          "role_id": "5caf5444c61376319cef80a8",
          "create_time": 1555061609666,
          "__v": 0
        }
      ],
      "roles": [
        {
          "menus": [
            "/home",
            "/role",
            "/category",
            "/products",
            "/product",
            "/charts/bar"
          ],
          "_id": "5caf5444c61376319cef80a8",
          "name": "测试",
          "create_time": 1554639521749,
          "__v": 0,
          "auth_time": 1555145863489,
          "auth_name": "admin"
        }
      ]
    }
  }
}

componentDidMount() {
  this.getData()
}
  render() {
    const {isShow} = this.state
    const {users,roles} = this.data.data
    const usersObj = this.users
    const title = (
      <>
        <Button type='primary' onClick={this.createUser}>创建用户</Button>&nbsp;&nbsp;
      </>
      )
    return (
      <div>
        <Card title={title}>
      <Table 
        bordered 
        dataSource={users} 
        columns={this.columns}
        // rowSelection={{type: 'radio',selectedRowKeys:[role._id]}}
        onRow={this.onRow}
        rowKey='_id'
        pagination={{
         defaultPageSize:CON_NUMBER,
        }} 
        />
      </Card>
      <Modal 
         title={usersObj ? '修改用户':"添加用户"}  
         okText='确认'
         cancelText='取消'
         visible={isShow} 
         onOk={this.addHandleOk} 
         onCancel={this.handleCancel}>
            <UserForm ref={this.fd} roles={roles} users={this.users} />
      </Modal>
      {/* <Modal 
          title="设置角色权限" 
          okText='确认' 
          cancelText='取消' 
          visible={isShow} 
          onOk={this.updateHandleOk} 
          onCancel={this.handleUpdateCancel}>

      </Modal> */}
      </div>
    );
  }
}

export default User;