import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'
import './about.css'

export default class About extends Component{
    //初始化配置

    //生命周期
    componentWillMount () {
        console.log("params:",this.$router.params)
    }
    //render
    render(){
        return <div>1234</div>
    }
}