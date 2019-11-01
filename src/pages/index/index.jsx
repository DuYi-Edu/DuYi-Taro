import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button } from '@tarojs/components'
import './index.css'
import {setGlobalData,getGlobalData} from "../../global"

import Dialog from "../../components/Dialog/Dialog"

const app = Taro.getApp()
export default class Index extends Component {
  state={
    loading:"还有内容"
  }

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh:true,
    onReachBottomDistance:40,
    pageOrientation: "auto",
  }
  //下拉刷新的动作行为事件
  onPullDownRefresh(){
    console.log("pullDownRefresh begin")
    //可以直接在Trao代码中调用微信对象
    wx.stopPullDownRefresh()
  }

  //页面触底行为事件
  onReachBottom(){
    console.log("ReachBottom")
    this.setState({
      loading:"加载中..."
    })
  }

  //下拉动作
  onPageScroll(e){
  }

  //转发行为事件
  onShareAppMessage(e){
    let _title = "Taro学习站"
    if(e.from === "button"){
      console.log(e.target)
      _title = e.target.dataset.name
    }
    return{
      title:_title,
      path:'/pages/index/index',
      imageUrl:"../../images/123.jpg"
    }
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
   //页面更新前的操作
   componentWillUpdate(nextProps, nextState){
      console.log("WillUpdate",nextState)
      console.log("nextProps",nextProps)
   }
   //页面更新完毕的操作
   componentDidUpdate(prevProps, prevState){

   }

  handleClick(){
    Taro.navigateTo({
      url:'/pages/center/center?id=2&type=test'
    })
    this.setState({
      switch:!this.state.switch
    })
  }

  //点击tap时触发
  onTabItemTap(){
    console.log("TabItemTap")
  }

  render () {
    return (
      <View className='index'>
        <Dialog myText="我的文本" myName='Jonson'>
          <Button>按钮</Button>
        </Dialog>
        <Button onClick={this.handleClick}>
          {"当前状态为："+this.state.switch}
        </Button>
        <Button id="myBtn" data-name="Taro学习平台" openType="share">转发</Button>
        <View className="fixedBottom">{this.state.loading}</View>
      </View>
    ) 
  }
}
