import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/JsxDemo/JsxDemo',
      'pages/index/index',
      'pages/about/about',
      'pages/center/center'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: 'Taro操作',
      navigationBarTextStyle: 'white',
      backgroundColor:"#ccc"
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
    "tabBar": {
      'borderStyle':'black',
      'position':'bottom',
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "./images/icon_1.png",
          "selectedIconPath": "./images/icon_11.png"
        },
        {
          "pagePath": "pages/about/about",
          "text": "关于",
          "iconPath": "./images/icon_2.png",
          "selectedIconPath": "./images/icon_22.png"
        }
      ]
    }
   
  }

  globalData = {
    loginType:"tom",
    userInfo:{
      gender:1,
      isPass:true
    }
  }

  componentDidMount () {
    //this.user={name:"tom"}
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
