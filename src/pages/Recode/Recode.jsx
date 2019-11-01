import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'

//首先先要获取音频管理器对象，通过此对象来调用start
const recorderManager = Taro.getRecorderManager()

export default class Record extends Component{
    state={
        tempFilePath:''
    }

    //开始录音操作
    start(){
        
        const options = {
            duration:10000,//指定录音的时长，单位ms
            sampleRate:16000,//采样率
            numberOfChannels:1,//录音通道数
            encodeBitRate:96000,//编码码率
            formate:'mp3',//音频格式，有效 aac/mp3
            frameSize:50,//指定帧大小，单位kb
        }
        recorderManager.start(options)
        recorderManager.onStart(()=>{
            console.log('recorder start')
        })
        recorderManager.onError((err)=>{
            console.log('err',err)
        })
    }

    //停止录音操作
    stop(){
        let that = this
        recorderManager.stop()
        recorderManager.onStop((res)=>{
            //停止后的可以获取临时存储路径
            console.log(res)
            //存储录音文件
            that.setState({
                tempFilePath:res.tempFilePath
            })
            console.log('录音停止',res.tempFilePath)
        })
    }

    //播放
    play(){
        //读取在state中的录音临时文件并完成播放
        //添加音频播放器对象
        const innerAudioContext = Taro.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = this.state.tempFilePath
        innerAudioContext.onPlay(()=>{
            console.log('开始播放')
        })
        innerAudioContext.onError((res)=>{
            console.log('[error]',res)
        })
    }

    render(){
        return (
            <View>
                Record基础版本
                <Button type='default' onClick={this.start.bind(this)}>开始录音</Button>
                <Button type='primary' onClick={this.stop.bind(this)}>停止录音</Button>
                <Button type='warn' onClick={this.play.bind(this)}>播放按钮</Button>
            </View>
        )
    }
}