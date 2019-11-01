import Taro,{Component} from '@tarojs/taro'
import {View} from "@tarojs/components"

export default class Dialog extends Component{
    //this.props.[name] 来获取引用方的组件
    render(){
        return (
            <View className="index">
                我是一个弹窗
                <View>{this.props.myText}</View>
                <View>{this.props.myName}</View>
                {this.props.children}
            </View>
        )
    }
}