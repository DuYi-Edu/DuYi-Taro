import Taro,{Component} from '@tarojs/taro'
import {View,Slider,Button} from '@tarojs/components'

export default class KeepScreenOn extends Component{

    state = {
        screenBrightness:0
    }

    //滑块的改变事件
    changeScreenLight(e){
        let screenLightVal =parseFloat(e.detail.value).toFixed(1)
        //设置当前的屏幕亮度
        Taro.setScreenBrightness({
            value:screenLightVal
        })
        Taro.getScreenBrightness({
            success:(res)=>{
                this.setState({
                    screenBrightness:res.value
                })
            }
        })
    }

    //锁定亮度
    keepScreen(){
        let params={
            keepScreenOn:true
        }
        Taro.setKeepScreenOn(params).then(()=>{
            Taro.showToast({
                title:'锁定成功'
            })
        })
    }

    render(){
        return(
            <View>
                <Slider min='0' max='1' step='0.1' onChange={this.changeScreenLight.bind(this)}></Slider>
                <View>屏幕亮度：{this.state.screenBrightness}</View>
                <Button onClick={this.keepScreen}>确定亮度</Button>
            </View>
        )
    }
}