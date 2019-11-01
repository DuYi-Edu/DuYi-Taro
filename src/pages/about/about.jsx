import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'
import './about.css'

export default class About extends Component{
    //构造函数
    constructor(){
        //调用基类构造
        super()
        this.state={}
        this.goToIndex = this.goToIndex.bind(this)
    }

    //生命周期
    componentWillMount () {
    }

    //跳转传值
    goToIndex(){
        //taro跳转模型,新打开一个页面
        /*
        Taro.navigateTo({
            url:'/pages/index/index'
        })*/
        
       //重新定向
       Taro.redirectTo({
           url:`/pages/index/index?id=${100}&name=${'mary'}`
       })
       
      /*
       wx.redirectTo({
         url:'/pages/index/index'
       })
       */
      
    }

    //render
    render(){
        return <View>
            <Button onClick={this.goToIndex}>跳转传值</Button>
        </View>
    }
} 