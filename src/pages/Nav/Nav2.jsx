import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'

export default class Nav2 extends Component{

    componentDidShow(){
        console.log('Nav2页面显示')
    }

    componentDidHide(){
        console.log('Nav2进入非激活状态')
    }

    goto(){
        /*
        Taro.reLaunch({
            url:'./Nav3'
        })
        */
        
        Taro.navigateTo({
            url:'./Nav3'
        })
        
    }

    //回退
    goBack(){
        Taro.navigateBack()
    }

    render(){
        return(
            <View>
                <Button onClick={this.goto.bind(this)}>Nav2跳转</Button>
                <Button onClick={this.goBack}>回退</Button>
            </View>
        )
    }
}