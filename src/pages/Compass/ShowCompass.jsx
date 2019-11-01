import Taro,{Component} from '@tarojs/taro'
import {View,Text,Image,Button} from '@tarojs/components'
import './ShowCompass.css'

export default class ShowCompass extends Component{
    constructor(){
        super(...arguments)
    }

    state = {
        direction:'--',
        angle:'--',
        rotate:''
    }

    //转发分享
    onShareAppMessage(){
        return {
            title:`我现在正面向${this.state.direction}方向，点我使用迷你指南针`,
            path:'./Compass.jsx'            
        }
    }

    //生命周期
    componentDidShow(){
        //开始罗盘的调用
        Taro.onCompassChange((res)=>{
            let directions = res.direction.toFixed(2)
            let raios = res.direction.toFixed(0)
            this.setState({
                angle:directions,
                rotate: 360-raios,
                direction:this.check(raios)
            })
        })

        /*
         * 有罗盘会自动执行onCompassChange事件
         * 没有的话就不会执行上面的setState操作 
         * 检查是否有罗盘
         */
        setTimeout(()=>{
            if(this.state.direction == '--' && this.state.angle == '--'){
                //提示用户，你手机没有带罗盘
                Taro.showToast({
                    title:'您手机没有此功能',
                    icon:'none',
                    duration:4000,
                    mask:true
                })
            }
        },3000)

    }
 
    //根据角度换取中文方向
    check(i){
        if(15 < i && i <= 75){
            return '东北'
        }else if(75 < i && i <= 105){
            return '正东'
        }else if(105 < i && i <= 165){
            return '东南'
        }else if(165 < i && i <= 195){
            return '正南'
        }else if(195 < i && i <= 255){
            return '西南'
        }else if(255 < i && i <= 285){
            return '正西'
        }else if(285 < i && i <= 345){
            return '西北'
        }else{
            return '正北'
        }
    }

    config={
        navigationBarTitleText: '指南针'
    }

    render(){
        let styleParams = {
            transform:`rotate(${this.state.rotate}deg`
        }
        return (
            <View className='container'>
                <View className='text'>
                    <Text>{this.state.direction}</Text>
                    <Text>{this.state.angle}°</Text>
                </View>
                <View className='pic'>
                    <Image src='../../static/images/compass.png' style={styleParams}></Image>
                </View>
            </View>
        )
    }
}