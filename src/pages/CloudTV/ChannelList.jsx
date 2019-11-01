import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Swiper, Navigator, Button } from '@tarojs/components'
import './ChannelList.css'

const db = Taro.cloud.database({
    env: 'test-jj55w'
})

const channelListObj = db.collection('channelList')
const channelMenuObj = db.collection('channelMenu')
const _cmd = db.command


export default class ChannelList extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        channelID: '',//当前的频道ID
        channelName: '',//当前的频道Name
        channelImg: '',//当前的频道图标
        channelAdArr: [],//当前的广告数组
        programList: []//当前的电视节目列表
    }

    componentDidShow() {
        let that = this
        //接受前页面(组件传送的值)
        let params = this.$router.params
        this.setState({
            channelID: params.channelId,
            channelName: params.channelName
        }, () => {
            //查找当前这个电台的图标
            channelListObj.doc(this.state.channelID).get()
                .then(res => {
                    that.setState({
                        channelImg: res.data.channelImg
                    })
                })
                .catch(console.error)
            // 查找此电视台的界面和广告
            channelMenuObj.where({ 'channelName': this.state.channelName }).get()
                .then(res => {
                    that.setState({
                        channelAdArr: res.data[0].channerAD,
                        programList: res.data[0].programList
                    }, () => { console.log('state', this.state) })
                })
                .catch(console.error)



        })

    }

    //电视节目介绍
    programInfo(channelIndex,e) {
        //Taro数据存储
        Taro.setStorage({
            key:'programDescription',
            data: this.state.programList[channelIndex],
            success(){
                Taro.navigateTo({
                    url:'/pages/CloudTV/ProgrameInfo'
                })
            }
        })
    }
 
    render() {
        return (
            <View className='container'>
                <View className='page-section'>
                    <View className='row'>
                        <Image src={`../../static/images/${this.state.channelImg}`}></Image>
                        <Text className='title'>{this.state.channelName}</Text>
                    </View>
                    <Swiper className='swiper' autoplay>
                        {this.state.channelAdArr.map((item, index) => {
                            return (
                                <swiper-item key={index}>
                                    <Navigator url={`/pages/${item.imgUrl}/${item.imgUrl}`}>
                                        <Image src={item.imgPath}></Image>
                                    </Navigator>
                                </swiper-item>
                            )
                        })
                        }
                    </Swiper>

                    {/* 电视节目列表 */}
                    <View className='list'>
                        {this.state.programList.map((item, index) => {
                            return (
                                <View key={index} className='row listRow'>
                                    <View className='area'>
                                        <Text>{item.programName}</Text>
                                        <Text>{item.playTime}</Text>
                                    </View>
                                    <Button onClick={this.programInfo.bind(this,index)}>介绍</Button>
                                </View>
                            )
                        })

                        }


                    </View>
                </View>
            </View>
        )
    }
}