import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'

import ShowClock from '../../components/ShowTime/ShowTime'
import './index.css'

export default class Index extends Component{
    /** 
     * 不可用
     * #a{}
     * [a]{}
     * View Button{}
     * 
     * 后代节点选择器
     * .a > .b 用于View节点。 否则无效
     * .a .b 是可以的
     * 
     * 在全局app.css文件中的设定
     * 只有继承样式可以被所有页面使用（包括组件）
     * 其他的对自定义组件无效
    */

    //构造
    constructor(){

    }

    //生命周期
    componentDidMount(){
       
    }

    //JSX返回
    render(){
        return (
        <View className='index'>
            <View className='innerView'>
                <Text className='outterText'>
                    outerText
                    <Text className='innerText'>
                        innerText
                    </Text>
                </Text>
                hello innerView
            </View>
            <ShowClock></ShowClock>
        </View>
        )
    }
}