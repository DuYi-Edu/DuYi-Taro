import Taro,{Component} from '@tarojs/taro'
import {View,Image,Button} from '@tarojs/components'
import './PlayMusic.css'

export default class PlayMusic extends Component{
    constructor(props){
        super(props)
    }

    state = {
        audioUrl: 'http://mpge.5nd.com/2018/2018-5-10/85111/1.mp3',
        coverImgUrl: 'http://img.5nd.com/86/photo/2018album/20185/85111.jpg'
    }

    config = {
        navigationBarTitleText: 'Taro音频基础'
    }

    componentDidShow(){

    }

    //开播播放触发事件
    actionPlay(){
        //播放歌曲（背景音乐播放-BMG）
        Taro.playBackgroundAudio({
            dataUrl: this.state.audioUrl,
            title: '哑巴',
            coverImgUrl: this.state.coverImgUrl
        })
        //播放开始监控
        Taro.onBackgroundAudioPlay(()=>{
            console.log('开始播放歌曲')
        })
    }

    //暂停播放触发事件
    actionPause(){
        //暂停操作
        Taro.pauseBackgroundAudio(),
        Taro.onBackgroundAudioPause(()=>{
            console.log('暂停播放歌曲')
        })
    }

    //停止播放触发事件
    actionStop(){
        //停止
        Taro.stopBackgroundAudio()
        Taro.onBackgroundAudioStop(()=>{
            console.log('停止播放歌曲')
        })
    }

    //指定播放到某一个特定位置
    actionSeek(){
        Taro.seekBackgroundAudio({
            position:20
        })
    }

    render(){
        return(
            <View>
                <View className='title'>PlayMusic</View>
                <View className='section'>
                    <Image src={this.state.coverImgUrl}></Image>
                </View>
                <View className='btn'>
                    <Button type='primary' onClick={this.actionPlay.bind(this)}>播放</Button>
                    <Button type='primary' onClick={this.actionPause.bind(this)}>暂停</Button>
                    <Button type='primary' onClick={this.actionStop.bind(this)}>停止</Button>
                    <Button type='primary' onClick={this.actionSeek.bind(this)}>跳转（指定播放）</Button>
                </View>
            </View>
        )
    }
}