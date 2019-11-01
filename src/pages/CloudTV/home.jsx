import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text ,Button} from '@tarojs/components'
import './home.css'

//数据库对象
const db = Taro.cloud.database({
    env: 'test-jj55w'
})
//表对象
const channelListObj = db.collection('channelList')
//命令对象
const _cmd = db.command

export default class home extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        channelLists: ''
    }

    config = {
        navigationBarTitleText: '电视云'
    }

    componentDidShow() {
        let that = this
        //获取云数据库字段的加载
        channelListObj.get()
            .then(res => {
                console.log(res)
                //给到state
                that.setState({
                    channelLists: res.data
                })
            })
            .catch(console.error)
    }

    //跳转电视台
    gotoTVChannel(id,name,e) {
        console.log(id,name)
        //跳转和字符串连接
        let params = {
            url:`/pages/CloudTV/ChannelList?channelId=${id}&channelName=${name}`
        }
        Taro.navigateTo(params)
    }

    //跳转搜索页面
    search(){
        //当tabbar有如下路径的时候，不能使用navigateTo跳转
        /*
        Taro.navigateTo({
            url:'/pages/CloudTV/Search'
        })
        */
       Taro.switchTab({
        url:'/pages/CloudTV/Search'
       })
    }

    render() {
        return (
            <View className='container'>
                <View className='title'>电视云</View>
                <View className='page-section'>
                    {this.state.channelLists.map((item, index) => {
                        return (
                            <View key={index} className='row' onClick={this.gotoTVChannel.bind(this,item._id,item.channelName)}>
                                <Image src={`../../static/images/${item.channelImg}`}></Image>
                                <Text className='channel-name'>{item.channelName}</Text>
                                <Text className='sign'>&gt;</Text>
                            </View>
                        )
                    })


                    }
                </View>
                <Button onClick={this.search}>搜索</Button>
            </View>

        )
    }
}