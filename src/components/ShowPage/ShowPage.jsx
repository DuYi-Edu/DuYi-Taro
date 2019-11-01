import Taro,{Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

/**
 * 类函数式组件 注意规范
 * 函数的命名必须以rander开头，render后的第一个字母必须大写
 * 函数的参数不得传入JSX元素
 * 函数不能递归
 */
export default class ShowPage extends Component{
    constructor(){
        super(...arguments)
        this.setState({
            myHead:this.props.myHeader
        })
    }

    state = {
        myHead: 'top shop sales'
    }

    //函数(在类组件中定义的函数，返回jsx格式)
    renderHeader(){
        const {myHead} = this.state
        return (
            <View>Header,{myHead}</View>
        ) 
    } 

    renderFooter(footer){
        return (
            <View>Footer {footer}</View>
        )
    }


    render(){
        return(
            <View>
                {this.renderHeader()}
                <View>welcome to the Taro</View>
                {this.renderFooter(this.props.myFooter)}
            </View>
        )
    }
}