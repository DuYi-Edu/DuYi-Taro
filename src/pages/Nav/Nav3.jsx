import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'

export default class Nav3 extends Component{

    componentDidShow(){
        console.log('Nav3页面显示')
    }

    componentDidHide(){
        console.log('Nav3进入非激活状态')
    }

    goto(){
        
    }

    goBack(){
        Taro.navigateBack({
            delta:2
        })

        // Taro.switchTab({
        //     title:''
        // })
    }

    //获取页面栈
    getCurrentPages(){
        console.log(Taro.getCurrentPages())
        console.log(Taro.getCurrentPages().length)
    }

    render(){
        return(
            <View>
                <Button onClick={this.goto.bind(this)}>Nav3跳转</Button>
                <Button onClick={this.goBack}>回退1</Button>
                <Button onClick={this.getCurrentPages}>获取页面栈</Button>
            </View>
        )
    }
}