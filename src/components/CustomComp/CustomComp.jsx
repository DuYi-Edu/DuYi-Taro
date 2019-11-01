import Taro,{Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import './CustomComp.css'

export default class CustomComp extends Component{
    static options = {
        addGlobalClass:true
    }
    static defaultProps = {
        className:''
    }
    //static externalClasses = ['my-class']
    constructor(){}
    componentDidMount(){}
    render(){
        return (
            <View className="red-text">
                CustomComp
            </View>
        )
    }
}