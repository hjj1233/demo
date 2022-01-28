import React, { Component } from 'react';
import {Form,Tree,Input,Modal} from 'antd'
import { TreeNode } from 'rc-tree-select';
const {Item}=Form
class AuothForm extends Component {

state = {
  treeData:[]
}

constructor(props) {
  super(props)
  const menus = this.props.role.menus
  this.state={
    checkedKeys:menus
  }
}

getRole =()=>this.state.checkedKeys

   onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.setState({
      checkedKeys:checkedKeys
    })
  };


componentWillMount(){
   this.treeData = [
    {
      title: '平台权限',
      key: '0-0',
      children: [
        {
          title: '首页',
          key: '/home',
        },
        {
          title: '商品',
          key: '0-1',
          children: [
            {
              title: '品类管理',
              key: '/category',
            },
            {
              title: '商品管理',
              key: 'product',
            },
          ],
        },
        {
          title: '用户管理',
          key: '/user',
        },
        {
          title: '角色管理',
          key: '/role',
        },
        {
          title: '图形图表',
          key: '0-2',
          children: [
            {
              title: '柱形图',
              key: '/charts/bar',
            },
            {
              title: '折线图',
              key: '/charts/line',
            },
            {
              title: '饼图',
              key: '/charts/pie',
            },
          ],
        },
      ],
    },
  ];  
}

//根据新传入的role来更新checkedKeys状态
/*
当组件接收到新闻的属性时自动调用
*/
componentWillReceiveProps(nextProps) {
  console.log('componentWillReceiveProps()',nextProps)
  const menus = nextProps.role.menus
  this.setState({
    checkedKeys:menus
  })
}

getTreeNodes=(menuList)=>{
  return  this.treeData.reduce((pre,item)=>{
    pre.push(
      <TreeNode title={item.name}  key={item.key}>
        {item.children ? this.getTreeNodes(item.children):null}
      </TreeNode>
    ) 
    return pre
  },[])
}

componentDidMount() {
  // this.TreeNode = this.getTreeNodes(this.treeData)
 

}

  render() {
    const {role} =this.props
    const {checkedKeys} = this.state
    console.log(role)
    return (
      <div>
         <Item   label='角色名称' rules={[{required:true}]}>
            <Input value={role.name } disabled />
          </Item>
          <Item>
          <Tree
              checkable
              defaultExpandAll
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              checkedKeys={ checkedKeys}
              treeData={this.treeData}
    />
          </Item>
      </div>
    );
  }
}

export default AuothForm;