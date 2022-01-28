import React, { Component } from 'react';
import moment from 'moment'
import { Modal,message } from 'antd';
import { withRouter } from 'react-router-dom';

import './index.less'
import {reqWeather} from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import LinkButton from '../../components/link-button'

class Header extends Component {

  state= {
    createTime:'',
    dayPictureUrl:'',
    weather:'',
    pathName:''
  }

  getTime=()=>{
    // const createTime=this.state.createTime
   this.timer= setInterval(()=>{
this.setState({createTime:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')})
    },1000)
  }


getWeather=async ()=>{
  // const {dayPictureUrl, weather} = await reqWeather('深圳')
  // console.log(dayPictureUrl,weather)
  // this.setState({dayPictureUrl,weather})
  const res= await reqWeather('深圳')
  console.log(res)
}
LoginOut = ()=>{
  Modal.confirm({
    content:'您确认要退出吗?',
    okText:'确认',
    cancelText:'取消',
    onOk:()=>{
      //清除浏览器里的用户信息
      storageUtils.removeUser()
      //清除本地里的用户信息
      memoryUtils.user={}
      this.props.history.replace('/login')
      message.success('退出成功')
    },
  })
}

componentDidMount(){
  // setInterval(()=>{},1000)
  this.getTime()
  this.getWeather()
  // const pathName=  this.props.location.pathname
  // this.setState({pathName})
  // console.log('pathName',pathName)
}

componentWillUnmount() {
  clearInterval(this.timer)
}


  render() {
    const {dayPictureUrl,weather,createTime} =this.state
    const username=memoryUtils.user.username
    // const {pathName} = this.state
    const pathName=  this.props.location.pathname
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.LoginOut}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{
                        pathName==='/home'
                        ? '首页' : pathName==='/category' 
                        ? '品类管理': pathName==='/product' 
                        ? '品牌管理' : pathName==='/user' 
                        ? '用户管理':pathName==='/role'
                        ? '角色管理': pathName==='/charts/bar'
                        ? '柱形图' : pathName==='/charts/line'
                        ? '折线图' : pathName==='/charts/pie'
                        ? '饼图':'首页'
          }</div>
          <div className='header-bottom-right'>
            <span>{createTime}</span>
            <img src={dayPictureUrl} alt='weather'/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);