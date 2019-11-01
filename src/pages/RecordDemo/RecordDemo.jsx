import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Button } from '@tarojs/components'
import './RecordDemo.css'

let interval
export default class RecordDemo extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isSpeaking: true,
        flag: 1,
        voices: []
    }

    //生命周期钩子函数
    componentDidShow() {
        //初始化显示文件列表
        this.getFileList() 
    }

    config = {
        navigationBarTitleText: '录音机'
    }

    //手指按键触摸后触发
    touchdown() {
        let that = this
        console.log('开始录音，手指按下')
        //麦克风的帧动画
        this.speaking()
        //显示麦克风
        this.setState({
            isSpeaking: false
        })
        //开始录音
        Taro.startRecord({
            success(res) {
                //获取录音的临时文件路径
                let _tempFilePath = res.tempFilePath
                //持久保存
                Taro.saveFile({
                    tempFilePath: _tempFilePath,
                    success(res1) {
                        //本地文件大小限制在100M以内
                        let _savedFilePath = res1.savedFilePath
                    }
                })
                //成功提示
                Taro.showToast({
                    title: '录音完成',
                    icon: 'success',
                    duration: 1500
                })
                //文件列表获取
                that.getFileList()
            }
        })
    }

    //文件列表获取
    getFileList() {
        let that = this
        //获取当前已经保存的文件列表
        Taro.getSavedFileList({
            success(res2) {
                let voices = []
                for (let i = 0; i < res2.fileList.length; i++) {
                    //格式化时间
                    let _createTime = new Date(res2.fileList[i].createTime)
                    //将音频大小B转为KB
                    let _size = (res2.fileList[i].size / 1024).toFixed(2)
                    //建立对象 存储于voices
                    let voice = {
                        filePath: res2.fileList[i].filePath,
                        createTime: _createTime,
                        size: _size
                    }
                    //把数据放入voices
                    voices = voices.concat(voice)
                }
                //把数据存储到state的voices中
                that.setState({
                    voices: voices
                })
            }
        })
    }

    //帧动画
    speaking() {
        let that = this
        let i = 1
        interval = setInterval(() => {
            i++
            that.setState({
                flag: i % 5
            })
        }, 200)

    }

    //手指按键放开后触发
    touchup() {
        //不显示麦克风
        this.setState({
            isSpeaking: true
        })
        //关闭时间
        clearInterval(interval)
        //录音结束
        Taro.stopRecord()
    }

    //完成播放触发
    gotoPlay(_filePath,e){
        //提示用户
        Taro.showToast({
            title:'开始播放',
            icon:'success',
            duration:1000
        })
        //播放
        Taro.playVoice({
            filePath:_filePath,
        }).then(()=>{console.log('播放完成')})
        
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        {this.state.voices.map((item, index) => {
                            return (
                                <View taroKey={index} onClick={this.gotoPlay.bind(this,item.filePath)}  className='board'>
                                    <View className='cell'>
                                        <View className='cell-db'>
                                            <View className='date'>存储路径：{item.filePath}</View>
                                            <View className='date'>存储时间：{item.createTime.toString()}</View>
                                            <View className='date'>音频大小：{item.size} KB</View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })



                        }
                    </View>
                </ScrollView>
                {/* 动态麦克风 */}
                    <View className='center'>
                    <View hidden={this.state.isSpeaking} className='speak-style'>
                        {this.state.flag == 2 && <Image className='sound-style' src='../../static/images/voice_icon_speech_sound_1.png'></Image>}
                        {this.state.flag == 3 && <Image className='sound-style' src='../../static/images/voice_icon_speech_sound_2.png'></Image>}
                        {this.state.flag == 4 && <Image className='sound-style' src='../../static/images/voice_icon_speech_sound_3.png'></Image>}
                        {this.state.flag == 5 && <Image className='sound-style' src='../../static/images/voice_icon_speech_sound_4.png'></Image>}
                        {this.state.flag == 6 && <Image className='sound-style' src='../../static/images/voice_icon_speech_sound_5.png'></Image>}
                    </View>
                    </View>

                {/* 按键 */}
                <View className='record-style'>
                    <Button type='primary' onTouchStart={this.touchdown.bind(this)} onTouchEnd={this.touchup.bind(this)} className='btn-style'>按住录音</Button>
                </View>
            </View>
        )
    }
}