import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Swiper, Navigator, Button } from '@tarojs/components'
import './ProgrameInfo.css'

const db = Taro.cloud.database({
    env: 'test-jj55w'
})

const channelListObj = db.collection('channelList')
const channelMenuObj = db.collection('channelMenu')
const _cmd = db.command


export default class ProgrameInfo extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        programData:[]
    }

    componentDidShow(){
        let that = this
        //取出数据 
        Taro.getStorage({
            key:'programDescription',
            success(res){
                console.log(res)
                that.setState({
                    programData:res.data
                })
            }
        })
    }

    //返回首页
    returnTVList(){
        Taro.reLaunch({
            url:'/pages/CloudTV/home'
        })
    }

    returnBack(){
        Taro.navigateBack()
    }

    render() {
        return (
            <View className='container'>
                <View className='title'>{this.state.programData.programName}</View>
                <View className='time-info'>{this.state.programData.commonPlayTime}</View>
                <View className='description'>
                    {this.state.programData.programDescription}
                </View>
                <Button onClick={this.returnTVList}>返回电视列表</Button>
                <Button onClick={this.returnBack}>返回前页面</Button>
            </View>
        )
    }
}