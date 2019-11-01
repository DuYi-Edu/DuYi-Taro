import Taro,{Component} from "@tarojs/taro"
import {View,Button} from '@tarojs/components'
import './JsxDemo.css'

import MyDialog from '../../components/Dialog/Dialog'

export default class JsxDemo extends Component{
    //状态数据配置
    //类似原生小程序的data属性
    state={
        flag:true
    }
    //页面配置
    //类似原生小程序JsxDemo.json
    config={
        
    }

    //改变flag
    changeText(){
        this.setState({
            flag:!this.state.flag
        })
    }

    //生命周期
    componentWillMount () {
        
    }
    //render
    render(){
        const studentName = ['jack','tom','mary']

        let description
        if(this.state.flag){
            description = '这是一个正确的显示'
        }else{
            description = '这是一个错误的显示'
        }

        let elements = (<View>
            {/* <MyComponets.DatePiker/> React支持的“运行时指定类型”来引用组件，Taro不支持，不能用 */}
            {/* javascript:eval miniprogram:{{}} */}
            {this.state.flag &&
                <MyDialog myText={description} myName={'Jonson'} myBool></MyDialog>
            }
            <Button onClick={this.changeText}>改变值</Button>
            <View>{'Hello World'}</View>
            <View>{`Hello World`}</View>
            <View>Hello World</View>
            <View>
                {studentName.map((name)=><View>{name}</View>)}
            </View>
            {/* 三个 布尔值、Null和Underfined */}
            <View></View>
            <View />
            <View>{false}</View>
            <View>{null}</View>
            <View>{underfined}</View>
            <View>{true}</View>
        </View>)

        return (
            elements
         )
    }
}