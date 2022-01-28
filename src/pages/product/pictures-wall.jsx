import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDelete} from '../../api'
import {BASE_URL} from '../../utils/constant'
import PropTypes from 'prop-types'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {


  static propTypes = {
    imgs: PropTypes.array
  }
  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   previewTitle: '',
  //   fileList: [
  //     // {
  //     //   uid: '-1', // 每个file都有自己唯一的id
  //     //   name: 'image.png', //图片文件
  //     //   status: 'done', // 图片状态：done 已上传，upLoading: 正在上传中，removed: 已删除
  //     //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',//大图图片地址
  //     // },
  //   ],
  // };

constructor(props) {
  super(props)
const imgs = this.props.imgs
  let fileList = []
  if(imgs && imgs.length>0) {
    console.log(imgs)
    fileList= imgs.map((item,index)=>({uid:-index,name:item,status:'done',url:BASE_URL + item}))
  }
  //初始化数据
this.state ={
  previewVisible: false,
  previewImage: '',
  fileList
}
 

}


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

/**
 * file: 当前操作的图片文件（上传/删除）
 * fileList: 所有已上传图片文件对象的数组
 */

  handleChange =async ({ file,fileList }) => {
    console.log('handleChange()',file,file.status,fileList)
    //一旦上传成功，将当前上传的file的信息修正（name,url）
    if(file.status === 'done') {
     const result = file.response // {status:0,data: {name:'xxx.jpg',url:'图片地址'}}
     const {name,url} =result.data
     if(result.status === 0) {
        message.success('上传成功')
        file = fileList[fileList.length-1]
        file.name = name
        file.url = url
      }
    }else if(file.status === 'removed') {
        const result = await reqDelete(file.name)
        if(result.status === 0) {
          message.success('删除成功')
        }else {
          message.error('删除失败')
        }
      
    }else {
      message.error('上传失败')
    }
    this.setState({ fileList })
  };

  getImage = () =>{
    const {fileList} = this.state
      return  fileList.map(file=>file.name)
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload" /* 上传图片的接口地址 */
          accept='image/*' /**只接收图片格式 */
          name='image' /**请求参数名 */
          listType="picture-card" /** 卡片样式 */
          fileList={fileList} /**所有已上传图片文件对象的数组 */
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

