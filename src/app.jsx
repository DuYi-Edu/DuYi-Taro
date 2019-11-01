import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

//初始化云开发
Taro.cloud.init({
  env:'test-jj55w'
})


class App extends Component {
  config = {
    pages: [
      'pages/Friend/Home',
      'pages/Friend/History',
      'pages/Friend/Collect',
      'pages/Friend/Reply',
      'pages/Friend/HomeDetail',
      'pages/Friend/Me',
      'pages/Friend/Publish',
      'pages/CloudTV/Search',
      'pages/CloudTV/home',
      'pages/CloudTV/ProgrameInfo',
      'pages/CloudTV/ChannelList',
      'pages/CloudPhoto/PhotoList',
      'pages/CloudPhoto/Home',
      'pages/Kuaidi/Kuaidi',
      'pages/CloudDemo/CloudDemo',
      'pages/Cloud/Cloud',
      'pages/CanvasDemo/CanvasDemo',
      'pages/Chat/Chat',
      'pages/CameraPerson/CameraPerson',
      'pages/CameraPerson/ShowPhoto',
      'pages/CameraContorl/CameraContorl',
      'pages/Font/Font',
      'pages/SougouMusic/SougouMusic',
      'pages/PlayMusic/PlayMusic',
      'pages/RecordDemo/RecordDemo',
      'pages/Recode/Recode',
      'pages/ControlKey/Index',
      'pages/Refresh/Refresh3',
      'pages/Refresh/Refresh2',
      'pages/Refresh/Refresh1',
      'pages/ScrollTop/ScrollTop2',
      'pages/ScrollTop/ScrollTop1',
      'pages/Nav/Nav1',
      'pages/Nav/Nav2',
      'pages/Nav/Nav3',
      'pages/Nav/Nav4',
      'pages/Interactive/Interactive',
      'pages/Animation/Animation',
      'pages/File/File',
      'pages/SystemInfo/SystemInfo',
      'pages/UserCaptureScreen/UserCaptureScreen',
      'pages/ScanCode/Index',
      'pages/ScanCode/CreateScan',
      'pages/AddPhoneContact/AddPhoneContact',
      'pages/Compass/Compass',
      'pages/Compass/ShowCompass',
      'pages/KeepScreenOn/KeepScreenOn',
      'pages/Clipboard/Clipboard',
      'pages/DeviceMotionChange/DeviceMotionChange',
      'pages/Accelerometer/Accelerometer',
      'pages/RefFunction/RefFunction',
      'pages/MyRefs/MyRefs',
      'pages/MouseTracker/MouseTracker',
      'pages/App/App',
      'pages/FunctionControl/FunctionControl',
      'pages/Vote/Vote',
      'pages/OpenDataControl/OpenDataControl',
      'pages/CanvasControl/CanvasControl',
      'pages/MapControl/MapControl',
      'pages/CameraControl/CameraControl',
      'pages/VideoControl/VideoControl',
      'pages/ImageControl/ImageControl',
      'pages/AudioControl/AudioControl',
      'pages/navigatorControl/navigatorControl',
      'pages/formControl2/formControl2',
      'pages/formControl/formControl',
      'pages/basicControl/basicControl',
      'pages/textPage/textPage',
      'pages/home/home',
      'pages/myPage/myPage'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: 'Taro操作',
      navigationBarTextStyle: 'white',
      backgroundColor:"#ccc"
    },
    "tabBar": {
      'selectedColor':'#d81e06',
      'backgroundColor':'#ffffff',
      "list": [
        {
        "pagePath": "pages/Friend/Home",
        "text": "广场",
        "iconPath": "./static/images/tab/home_unselect.png",
        "selectedIconPath": "./static/images/tab/home_select.png"
        },
        {
          "pagePath": "pages/Friend/Publish",
          "text": "发布",
          "iconPath": "./static/images/tab/publish_unselect.png",
          "selectedIconPath": "./static/images/tab/publish_select.png"
        },
        {
          "pagePath": "pages/Friend/Me",
          "text": "我的",
          "iconPath": "./static/images/tab/me_unselect.png",
          "selectedIconPath": "./static/images/tab/me_select.png"
        }
      ]
    },
    networkTimeout:{
      "request":10000,
      "downloadFile":15000
    },
    requiredBackgroundModes: ['audio'],
    debug:false,
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    },
  
   
  }

  globalData = {
    loginType:"tom",
    userInfo:{
      gender:1,
      isPass:true,
      
    }
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}



  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
