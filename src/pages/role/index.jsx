import React, { Component } from 'react';
import {Card,Table,Button,Modal, message} from 'antd'
import {CON_NUMBER} from '../../utils/constant'
import moment from 'moment'
import {reqRoleData,reqAddRoleData,reqAddRoleUpdate} from '../../api'
import AddFrom from './addForm';
import AuothForm from './auothForm'
import memoryUtils from '../../utils/memoryUtils'

class Role extends Component {


constructor(props) {
  super(props)
  this.roleRef=React.createRef()
  this.state = {
    roleData:[],
    role:{},
    roleStatus:false,
    updateStatus:false
  }
  this.Role = React.createRef()
  
}


onRow=(record) => {
  return {
    onClick: event => {
      console.log(record)
      this.setState({
        role:record
      })
    }, // 点击行
  };
}

addHandleValue = (value) =>{
  this.name = value
}

getRole =async () =>{
  const result = await reqRoleData()
  if(result.status === 0 ) {
    const {data} = result.data
    this.setState({
      roleData:data
    })
  }
}

componentWillMount() {
  this.columns = [
    {
      title:'角色名称',
      dataIndex:'name'
    },
    {
      title:'创建时间',
      dataIndex:'create_time',
      render:(dom,recoder)=>{
        return <span>{moment(dom).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title:'授权时间',
      dataIndex:'auth_time',
      render:(dom,recoder)=>{
        return <span>{moment(dom).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title:'授权人',
      dataIndex:'auth_name'
    },

  ]


  this.data = {
    "status": 0,
    "data": [
        {
            "menus": [
                "/role",
                "/charts/bar",
                "/home",
                "/category"
            ],
            "_id": "5ca9eaa1b49ef916541160d3",
            "name": "测试",
            "create_time": 1554639521749,
            "__v": 0,
            "auth_time": 1558679920395,
            "auth_name": "test007"
        },
        {
            "menus": [
                "/role",
                "/charts/bar",
                "/home",
                "/charts/line",
                "/category",
                "/product",
                "/products"
            ],
            "_id": "5ca9eab0b49ef916541160d4",
            "name": "经理",
            "create_time": 1554639536419,
            "__v": 0,
            "auth_time": 1558506990798,
            "auth_name": "test008"
        },
        {
            "menus": [
                "/home",
                "/products",
                "/category",
                "/product",
                "/role"
            ],
            "_id": "5ca9eac0b49ef916541160d5",
            "name": "角色1",
            "create_time": 1554639552758,
            "__v": 0,
            "auth_time": 1557630307021,
            "auth_name": "admin"
        }
    ]
}
}

createRole = ()=>{
  this.setState({
    roleStatus:true
  })
}
updateRole = ()=>{
  this.setState({
    updateStatus:true
  })
}

handleCancel = ()=>{
  this.setState({
    roleStatus:false
  })
}
handleUpdateCancel = ()=>{
  this.setState({
    updateStatus:false
  })
}
addHandleOk = ()=>{
  // console.log(this.roleRef.current.onFinish())
  this.getAddData( this.name)
}
updateHandleOk =async ()=>{
  const role = this.state.role
  const menus = this.Role.current.getRole()
  role.menus = menus
  //获取设置角色权限的授权人信命
  role.auth_name = memoryUtils.user.username
  const result = await reqAddRoleUpdate(role)
  if(result.status == 0) {
    message.success('设置角色权限成功')
    this.getRole()
  }else {
    message.error('设置角色权限失败')
  }
this.setState({
  updateStatus:false
})

}
  //添加数据
  getAddData =async (value)=>{
    const result = await reqAddRoleData({roleName:value})
    if(result.status ===0) {
      const data = result.data
      //跟新roles状态：基于原本状态数据更新
      this.setState(state=>({
        roles: [...state.roles,data]
      }))
    }else {
      message.error('添加角色失败')
    }
  }

componentDidMount() {
  this.getRole()
}


  render() {
  
    const {roleData,role,roleStatus,updateStatus} = this.state
    const title = (
    <>
    
      <Button type='primary' onClick={this.createRole}>创建角色</Button>&nbsp;&nbsp;
      <Button type='primary' disabled={!role._id}  onClick={this.updateRole}>设置角色权限</Button>
    </>
    )

    const rowSelection = {
      // onChange: (selectedRowKeys, selectedRows) => {
      //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // },
      onSelect:(record, selected, selectedRows, nativeEvent) =>{  
      console.log(`selectedRowKeys: ${nativeEvent}`)
}
   }
    return (
      <div>
      <Card title={title}>
      <Table 
        bordered 
        dataSource={this.data.data} 
        columns={this.columns}
        rowSelection={{type: 'radio',selectedRowKeys:[role._id] ,onSelect:(record, selected, selectedRows, nativeEvent)=>{
          console.log(selected)
          this.setState({
            role:record
          })

        }}}
        //选择行
        onRow={this.onRow}
        rowKey='_id'
        pagination={{
         defaultPageSize:CON_NUMBER,
        }} 
        />
      </Card>
      <Modal title="创建角色" okText='确认' cancelText='取消' visible={roleStatus} onOk={this.addHandleOk} onCancel={this.handleCancel}>
      <AddFrom addHandleValue={this.addHandleValue} ref={ this.roleRef} />
      </Modal>
      <Modal title="设置角色权限" okText='确认' cancelText='取消' visible={updateStatus} onOk={this.updateHandleOk} onCancel={this.handleUpdateCancel}>
      <AuothForm ref={this.Role} role={role} />
      </Modal>
      </div>
    );
  }
}

export default Role;