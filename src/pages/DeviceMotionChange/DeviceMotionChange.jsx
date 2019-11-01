import Taro,{Component} from '@tarojs/taro'
import {View,Text,Button} from '@tarojs/components'
import './DeviceMotionChange.css'

export default class DeviceMotionChange extends Component{
    constructor(){
        super(...arguments)
    }
 
    state={
        screen:'正面',
        alpha: 0
    }

    //生命周期
    componentDidShow(){
        //设备方向的监听
        Taro.onDeviceMotionChange((res)=>{
            //console.log(res)
            let alpha = parseFloat(res.alpha)
            if(alpha > 45 && alpha < 136){
                this.setState({screen:'左侧'})
            }else if(alpha > 225 && alpha < 316){
                this.setState({screen:'右侧'})
            }else if(alpha > 135 && alpha < 226){
                this.setState({screen:'反面'})
            }else{
                this.setState({screen:'正面'})
            }
            this.setState({
                alpha:alpha
            })
        })
    }

    config={
        navigationBarTitleText: '设备方向'
    }

    //开始监听
    startScreenClick(){
        //调用Taro开始监听事件
        Taro.startDeviceMotionListening({
            success:(e)=>{
                console.log('start',e)
            }
        })
    }

    //停止监听
    endScreenClick(){
        Taro.stopDeviceMotionListening({
            success:(e)=>{
                console.log('stop',e)
            }
        })
    }

    render(){
        return(
            <View>
                <View className='message-view'>屏幕朝向
                    <Text className='text-sty'>{this.state.screen}</Text>
                </View>
                {/* alpha number 当手机坐标 x/y 和地球 x/y 重合时，绕着Z中转动的夹角alpha，范围取值为[0,2*PI), 逆时针转动为正*/}
                <View className='message-view'>当前为alpha:{this.state.alpha}</View>
                <Button className='btn' type='primary' onClick={this.startScreenClick.bind(this)}>开始监听</Button>
                <Button className='btn' type='primary' onClick={this.endScreenClick.bind(this)}>结束监听</Button>
            </View>
        )
    }
}