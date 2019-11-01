import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'
import './about.css'
import ShowClock from '../../components/ShowTime/ShowTime'

import Bottom from '../../components/FunComponent/fun'

export default class About extends Component{
    //构造函数
    constructor(){
        //调用基类构造
        super()
        this.state={flag:true,name:"jonson"}
        this.preventPop = this.preventPop.bind(this)
    }

    //生命周期
    componentWillMount () {
    }

    //按钮单击事件处理函数
    preventPop(flag,e){
        e.stopPropagation()
        this.setState({
            flag:true
        })
    }

    preventTop(e){
        console.log(e)
        console.log("aaa")
    }

    //render
    render(){
        const nameValue = 'testValue'
        return <View>
            <Button onClick={this.preventPop.bind(this,this.state.flag)}>开灯操作</Button>
            <Button onClick={this.preventTop.bind(this,this.state.flag)}>关灯操作</Button>
            <View>{this.state.flag?'开灯':'关灯'}</View>
            <switch type='switch' bindchange="preventTop"/>

            <Button onClick={(e)=>{
                e.stopPropagation()
                this.setState({
                    name:nameValue
                })
            }}>改变匿名函数操作</Button>
            {this.state.name}
            <ShowClock/>

            <Bottom name='alice' age='20'></Bottom>
        </View>
    }
} 