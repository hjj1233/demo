import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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




import './index.less'
import Logo from '../../asstes/images/logo512.png'

const { SubMenu } = Menu;


class LeftNav extends Component {

  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className='left-nav'>
      <Link to='/' className='left-nav-header'>
      <img src={Logo} alt="logo" />
      <h1>硅谷后台</h1>
      </Link>

      <div >
        <Menu
          defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to='/home'>首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <Link to='/category'>品类管理</Link>
              
              </Menu.Item>
            <Menu.Item key="3" icon={  <ToolOutlined />}>
              <Link to='/product'>商品管理</Link>
             
              </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<UserOutlined />}>
           <Link to='/user' >用户管理</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SafetyOutlined />}>
            
            <Link to='/role'>角色管理</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
            <Menu.Item key="6" icon={<BarChartOutlined />}>
            
            <Link to='/charts/bar'>柱形图</Link>
              </Menu.Item>
            <Menu.Item key="7" icon={ <LineChartOutlined />}>
          <Link to='/charts/line'>折线图</Link>
              
              </Menu.Item>
              <Menu.Item key="8" icon={  <PieChartOutlined />}>
              <Link to='/charts/pie'>饼图</Link>
            
              </Menu.Item>
          </SubMenu>

        </Menu>
      </div>
      </div>
    );
  }
}

export default LeftNav;