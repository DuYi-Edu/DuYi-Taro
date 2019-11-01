import Taro,{Component} from '@tarojs/taro'
import {View,Text,Audio,Button} from '@tarojs/components'

export default class AudioControl extends Component{
    constructor(){
        super(...arguments)
    }

    state = {
        audioAction: {method:'pause'}
    }

    //audio的播放事件
    audioOnPlay(){
        console.log('现在正在播放')
    }

    //audio的暂停事件
    audioOnPause(){
        console.log('现在暂停了播放')
    }

    //播放到末尾时触发
    audioOnEnded(){
        console.log('音频播放完毕')
    }

    //音频播放出错时触发 
    audioOnError(e){
        console.log(e)
        console.log('音频播放出错')
    }

    //播放进度调整时触发，接受触发频率为250ms一次
    onTimeUpdate(e){
        console.log(e)
        console.log('播放进度变化时触发')
    }

    //按钮点击播放audio组件(微信小程序专用)
    playAudio(){
        this.setState({
            audioAction:{
                methods:'play'
            }
        })
    }

    render(){
        let audioControls = true
        let audioAutoplay = false
        let audioLoop = false
        let audioMuted = true//微信小程序无效

        
        return(
            <View>
                {/* Audio 音频 */}
                {/* muted 静音播放，intialTime初始播放位置 */}
                {/* author属性：作者，name属性：音频名字，poster属性：封面图片 */}
                <Audio 
                    //action = {this.state.audioAction}
                    src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
                    controls = {audioControls}
                    autoplay = {audioAutoplay}
                    loop = {audioLoop}
                    muted = {audioMuted}
                    initialTime = '30'
                    id = 'myVideo'
                    author = '许巍'
                    name = '此时此刻'
                    poster = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
                    onPlay = {this.audioOnPlay}
                    onPause = {this.audioOnPause}
                    onEnded = {this.audioOnEnded}
                    onError = {this.audioOnError}
                    onTimeUpdate = {this.onTimeUpdate}
                />

                {/* 控件操控audio */}
                <View>
                    <Text>按钮操控</Text>
                    {/* 微信小程序中有action属性，taro组件库中没有 */}
                    <Button onClick={this.playAudio}>播放(小程序属性报错警告)</Button>
                </View>
            </View>
        )
    }
}