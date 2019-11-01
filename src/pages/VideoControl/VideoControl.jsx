import Taro,{Component} from '@tarojs/taro'
import {View,Video,Input,Button} from '@tarojs/components'
import { timingSafeEqual } from 'crypto';

export default class VideoControl extends Component{
    constructor(){
        //生成微信弹幕发送上下文对象
        this.videoContext = wx.createVideoContext('myVideo')
        super(...arguments)
    }

    state = {
        userInput:'',
        danmuList:[
            {
                text:'第一条弹幕语句出现',
                color:'#ff0000',
                time:1
            },{
                text:'第二条弹幕语句出现',
                color:'#00ff00',
                time:3
            }
        ]
    }

    videoOnPlay(){

    }

    videoOnPause(){

    }

    videoOnTimeUpdate(){

    }

    videoOnError(){

    }

    //发送弹幕
    sendDanmu(){
        //不要去把新发送的弹幕加载到danmuList，而是直接发送
        this.videoContext.sendDanmu({
            text: this.state.userInput,
            color:this.getRanomColor()
        })
    }

    //得到一个随机颜色值
    getRanomColor(){
        const rgb = []
        for(let i =0;i<3;++i){
            let color = Math.floor(Math.random()* 256).toString(16)
            color = color.length == 1 ? '0'+color : color
            rgb.push(color)
        }
        return '#'+rgb.join('')
    }

    //获取用户的数据
    getUserInput(e){
        console.log(e.detail.value)
        this.setState({
            userInput: e.detail.value
        })
    }
   
    render(){
        return (
            <View>
                <Video 
                    src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
                    controls = {true}
                    autoplay = {false}
                    poster = 'http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                    initialTime = '0'
                    id = "myVideo"
                    loop = {false}
                    muted = {false}
                    onPlay = {this.videoOnPlay}
                    onPause = {this.videoOnPause}
                    onTimeUpdate = {this.videoOnTimeUpdate}
                    onError = {this.videoOnError}

                    danmuList = {this.state.danmuList}
                    enableDanmu = {true}
                    danmuBtn ={true}
                />
                {/* 弹幕发送内容 */}
                <View>
                    <Input type='text' onBlur={this.getUserInput} placeholder='弹幕内容' />
                    <Button onClick={this.sendDanmu}>发送弹幕</Button>
                </View>
            </View>

            
        )
    }
}