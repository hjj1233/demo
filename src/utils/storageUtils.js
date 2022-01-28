import store from 'store'
const USER_KEY='user_key'

export default {
  //存储登录信息
  setUser(user) {
    // localStorage.setItem('user_key',JSON.stringify(user))
    store.set(USER_KEY,user)
  },
//获取登录信息
getUser(user) {
    // return JSON.parse(localStorage.getItem('user_key') || '{}')
  return  store.get(USER_KEY)
},
//删除登录信息
removeUser(){
  localStorage.removeItem(USER_KEY)
}
  

}