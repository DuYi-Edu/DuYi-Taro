import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'

export default class Index extends Component{
    //构造
    constructor(){

    }

    //生命周期
    componentDidMount(){
        console.log(this.$router.params.id)
        console.log(this.$router.params.name)
    }

    //JSX返回
    render(){
        return <View>Index</View>
    }
}