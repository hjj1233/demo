import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/leftNav'
import Header from '../../components/header'
import Category from '../category'
import Home from '../home'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../notFound'
const { Footer, Sider, Content } = Layout

class Admin extends Component {
  componentWillMount() {}

  componentDidCatch() {}

  render() {
    const user = this.props.user
    console.log('user', user)
    if (!user || !user._id) {
      return <Redirect to="/login" />
    }
    //  console.log('用户信息1',user)
    return (
      <>
        {/* {console.log('用户信息2',user)} */}
        <Layout style={{ height: '100%' }}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{ margin: 20, backgroundColor: '#fff' }}>
              <Switch>
                <Redirect from="/" to="/home" exact={true} />
                <Route path="/home" component={Home} />
                <Route path="/category" component={Category} />
                <Route path="/product" component={Product} />
                <Route path="/role" component={Role} />
                <Route path="/user" component={User} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/line" component={Line} />
                <Route path="/charts/pie" component={Pie} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center', color: '#ccc' }}>
              推荐使用谷歌浏览器，效果会更好哟！
            </Footer>
          </Layout>
        </Layout>
      </>
    )
  }
}

export default connect((state) => ({ user: state.user }), {})(Admin)
