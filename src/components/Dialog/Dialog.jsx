import Taro,{Component} from '@tarojs/taro'
import {View} from "@tarojs/components"


export default class Dialog extends Component{
    //this.props.[name] 来获取引用方的组件
    
    //组件的生命周期

    //组件加载时触发，一个组件只会调用一次，在此期间Dom页面结构还未准备好，所以不能喝视图进行互动
    componentWillMount(){
        console.log("组件开始运行")
    }

    //初次渲染完成触发，一个组件只会调用一次，代表组件以及准备完毕，可以和视图进行交互
    componentDidMount(){
        console.log("初次渲染完成")
    }

    //以及装载的组件在接受到新的属性前调用
    componentWillReceiveProps(nextProps){
        console.log("接受到新数据时",nextProps)
    }

    //组件是否需要更新
    shouldComponentUpdate(newxtProps){
        console.log("shouldComponetUpdate",newxtProps)
        //return false
    }
    //在组件更新前的操作
    componentWillUpdate(newxtProps){
        console.log("组件更新前")
    }
    //在组件更新后的操作
    componentDidUpdate(newxtProps){
        console.log('组件更新完毕后')
    }
    //组件在卸载时触发
    componentWillUnmount(){

    }

    render(){
        let componentText,myBoolText
        if(this.props.myText=="这是一个正确的显示"){
            componentText = "显示正确"
        }else{
            componentText = "显示错误"
        }
        //如果没有给到myBool任何参数值，默认为true
        if(this.props.myBool){
            myBoolText = '真'
        }else{
            myBoolText = '假'
        }

        return (
            <View className="index">
                我是一个弹窗
                <View>{componentText}</View>
                <View>{this.props.myName}</View>
                <View>数据为{myBoolText}</View>
                {this.props.children}
            </View>
        )
    }
}
