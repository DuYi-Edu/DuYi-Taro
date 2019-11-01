import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.css'
import {setGlobalData,getGlobalData} from "../../global"

const app = Taro.getApp()
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  //初始化操作
  componentWillMount () {
    console.log("WillMount")
    console.log("app content:",app.globalData.userInfo)
    setGlobalData("loginType",true)
  }
  //监听挂在后
  componentDidMount () { 
    console.log("DidMount")
    console.log("loginType:", getGlobalData("loginType"))
  }

  componentWillUnmount () {
    console.log("WillUnmount")
    
   }

  //监听显示（激活）后
  componentDidShow () {
    console.log("DidShow")
   }

  //监听隐藏（非激活）后
  componentDidHide () {
    console.log("DidHide")
   }
   //错误出现后的监听操作
   componentDidCatchError(){
    console.log("DidCatchError")
   }
   //页面不存在时触发
   componentDidNotFound(){
    console.log("DidNotFound")
   }


  render () {
    return (
      <View className='index'>
        <Text>Hello World!</Text>
      </View>
    )
  }
}
