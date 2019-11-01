import Taro,{Component} from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import './SougouMusic.css'

export default class SougouMusic extends Component{

    state = {
        //记录播放状态
        isPlaying: false,
        //记录图片的播放和停止时显示的状态
        changedImg: false,
        //音乐播放对象
        music:{
            dataUrl:'http://mpge.5nd.com/2018/2018-5-10/85111/1.mp3',
            title:'哑巴',
            coverImgUrl:'http://img.5nd.com/86/photo/2018album/20185/85111.jpg'
        }
    }

    config = {
        navigationBarTitleText: '搜狗音乐播放'
    }

    //播放（暂停）触发
    onAudioTap(){
        console.log(this.state.isPlaying)
        if(this.state.isPlaying){
            //正在在播放，需要暂停
            Taro.pauseBackgroundAudio()
            //修改图标的状态
            this.setState({
                isPlaying: false
            })
        }else{
            let music = this.state.music;

            //调用组件的方式
            Taro.playBackgroundAudio({
                dataUrl: music.dataUrl,
                title: music.title,
                coverImgUrl:music.coverImgUrl
            }).then(res=>{console.log(res)}).catch(err=>console.log(err))

            //调用API的方式
            // const bgMusic = Taro.getBackgroundAudioManager()
            // bgMusic.title = music.title
            // bgMusic.src = music.dataUrl
            // bgMusic.play()

            //修改图标的状态
            this.setState({
                isPlaying: true,
                changedImg: true
            })
    
        }
    }

    //停止触发
    onStopTap(){
        let that = this
        Taro.stopBackgroundAudio({
            success(){
                 //修改图标的状态
                 that.setState({
                    isPlaying: false,
                    changedImg: false
                })
            }
        })
    }

    //快进（快退）
    onPositionTap(how,e){
        console.log(how)
        //获取音乐的状态
        try {
            Taro.getBackgroundAudioPlayerState({
                success(res){
                    console.log('res',res)
                    //判断是否在播放周期内
                    if(res.status === 1){
                        //获取音乐总时长
                        let duration = res.duration
                        //获得播放的当前位置
                        let currentPosition = res.currentPosition
                        if(how === "0"){
                            //退，在当前播放位置减10秒，如果当前秒数小于10秒，那么直接设置为1秒
                            let position = currentPosition - 10
                            if(position < 10){
                                position = 1
                            }
                            //快退操作
                            Taro.seekBackgroundAudio({
                                position: position
                            })
                            //给用户一个提示
                            Taro.showToast({
                                title:'快退10秒',
                                icon:'none',
                                duration:500
                            })
                        }
                        if(how === '1'){
                            //进，在当前播放的位置添加10秒，如果加上10后大于了从长度，那么直接变为1
                            let position = currentPosition + 10
                            if(position > duration){
                                position = 1
                            }
                            //执行快进
                            Taro.seekBackgroundAudio({
                                position:position
                            })
                            //提示用户
                            Taro.showToast({
                                title: '快进10秒',
                                icon:"none",
                                duration:500
                            })
                        }else{}
                        
                    }else{
                        //非播放状态
                        Taro.showToast({
                            title: '音乐未播放',
                            icon:"none",
                            duration: 800
                        })
                    }
                },
               fail(err){
                Taro.showToast({
                    title: '音乐未播放',
                    icon:"none",
                    duration: 800
                })
               }
            })
        } catch (error) {
            Taro.showToast({
                title: '音乐未播放',
                icon:"none",
                duration: 800
            })
        }
       
    }

    render(){
        return(
            <View className='container'>
                <View className='title'>SougouMusic</View>
                <Image className='bgaudio' src={!this.state.changedImg?   this.state.music.coverImgUrl:'../../static/images/timg.gif'} />
                <View className='control-view'>
                    <Image src='../../static/images/front10.png' onClick={this.onPositionTap.bind(this,'0')} />
                    <Image src={`../../static/images/${this.state.isPlaying?'pause':'play'}.png `}onClick={this.onAudioTap.bind(this)} />
                    <Image src='../../static/images/stop.png' onClick={this.onStopTap.bind(this)} />
                    <Image src='../../static/images/next10.png' onClick={this.onPositionTap.bind(this,'1')} />
                </View>
            </View>
        )
    }
}