import Taro,{Component} from '@tarojs/taro'
import {View,Button,Input} from '@tarojs/components'

export default class MyRefs extends Component{
    constructor(){
        super(...arguments)
    }

   componentDidMount(){
        //判断当前的环境是否是小程序还是<H5>
        if(process.env.TARO_ENV === 'weapp'){
            console.log('weapp')
            console.log(this.refs.myInput)
            //微信小程序获取到的对象为：wx.createSelectorQuery渠道小程序的原生组件
        }else if(process.env.TARO_ENV === 'h5'){
            console.log('h5')
            //访问到的是‘@tarojs/components'的Inputs组件实例
        }
   }

   //字符串的ref
    render(){
        return(
                <Input ref='myInput' />
        )
    }
}