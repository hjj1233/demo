import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SafetyOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  AreaChartOutlined,
  BarChartOutlined

} from '@ant-design/icons';
import {connect} from 'react-redux'
import {setHeaderTitle} from '../../redux/actions'



import './index.less'
import Logo from '../../asstes/images/logo512.png'

const { SubMenu } = Menu;


class LeftNav extends Component {

  // state = {
  //   collapsed: false,
  // };

  // toggleCollapsed = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

// componentWillMount(){
//   const openKey = this.props.location.pathname
//     console.log('渲染前',openKey)
// }


  render() {

    let openKey = this.props.location.pathname
    if(openKey.indexOf('/product')===0) {
      openKey='/product'
    }
    console.log('渲染后',openKey)
    let key
    if(openKey == '/home' || openKey == '/') {
      key = '首页'
    }else if(openKey == '/category') {
      key = '品类管理'
    }else if(openKey == '/product') {
      key = '商品管理'
    }else if(openKey == '/user') {
      key = '用户管理'
    }else if(openKey == '/role') {
      key = '角色管理'
    }else if(openKey == '/charts/bar') {
      key = '柱形图'
    }else if(openKey == '/charts/line') {
      key = '折线图'
    }else if(openKey == '/charts/pie') {
      key = '饼图'
    }
   this.props.setHeaderTitle(key)
  
    return (
      <div className='left-nav'>
      <Link to='/' className='left-nav-header'>
      <img src={Logo} alt="logo" />
      <h1>硅谷后台</h1>
      </Link>

      <div>
        <Menu
          defaultSelectedKeys={[`${openKey}` ]}
          defaultOpenKeys={openKey.indexOf('/product') === 0 ? ['sub1']:['sub1']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
          <Link to='/home'>首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
            <Menu.Item key="/category" icon={<UnorderedListOutlined />}>
            <Link to='/category'>品类管理</Link>
              
              </Menu.Item>
            <Menu.Item key="/product" icon={  <ToolOutlined />}>
              <Link to='/product'>商品管理</Link>
             
              </Menu.Item>
          </SubMenu>
          <Menu.Item key="/user" icon={<UserOutlined />}>
           <Link to='/user' >用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/role" icon={<SafetyOutlined />}>
            
            <Link to='/role'>角色管理</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
            <Menu.Item key="/charts/bar" icon={<BarChartOutlined />}>
            <Link to='/charts/bar'>柱形图</Link>
              </Menu.Item>
            <Menu.Item key="/charts/line" icon={ <LineChartOutlined />}>
          <Link to='/charts/line'>折线图</Link>
              </Menu.Item>
              <Menu.Item key="/charts/pie" icon={  <PieChartOutlined />}>
              <Link to='/charts/pie'>饼图</Link>
            
              </Menu.Item>
          </SubMenu>

        </Menu>
      </div>
      </div>
    );
  }
}

export default connect(
  state=>({header:state.headerTitle}),
  {setHeaderTitle}
)(withRouter( LeftNav));