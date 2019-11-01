import Taro,{Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import './CustomComp.css'

export default class CustomComp extends Component{
    constructor(){}
    componentDidMount(){}
    render(){
        return (
            <View className="index">
               <Text>{this.props.num}</Text>
               <Text className="arrow">></Text>
            </View>
        )
    }
}