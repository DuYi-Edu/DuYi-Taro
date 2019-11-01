import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import './Home.css'

const db = Taro.cloud.database()

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        currentPage: 1,
        pageNum: 6,
        totalCount: 0,
        topics: {}
    }

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '社交圈',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6',
        enablePullDownRefresh: true
    }

    componentDidShow() {
        this.getData()
    }

    //获取记录，每次只拿6条数据
    getData() {
        let that = this
        db.collection('topicDemo')
            .orderBy('date', 'desc')
            .limit(this.state.pageNum)
            .get({
                success(res) {
                    console.log(res)
                    //修改当前日期格式
                    res.data.map((value) => {
                        value.date = String(value.date)
                    })
                    that.setState({
                        topics: res.data
                    }, () => {
                        console.log(that.state.topics)
                    })
                    //下面可以隐藏标题栏loading动作和终止下拉刷新动作
                },
                fail(err) {
                    console.error('error', err)
                }
            })
    }

    //单击每项的查看具体信息触发
    onItemClick(id,openid,e) {
        //console.log('id',id)
        //console.log('openid',openid)
        if(id == '' || openid == ''){
            Taro.showToast({
                title:"您非法操作",
                icon:"none"
            })
        }
        //跳转
        Taro.navigateTo({
            url:`./HomeDetail?id=${id}&openid=${openid}`
        })
    }

    render() {
        return (
            <View>
                {this.state.topics.map((item, index) => {
                    return (
                        <View key={index} className='container' onClick={this.onItemClick.bind(this, item._id, item._openid)}>
                            <View className='container-content'>
                                <View className='user-info'>
                                    {/* 用户头像 */}
                                    <Image className='user-head' src={item.user.avatarUrl} />
                                    <View className='user-name-time'>
                                        <View className='user-name'>{item.user.nickName}</View>
                                        <View className='user-publish-time'>{item.date}</View>
                                    </View>
                                </View>
                                <View className='content'>
                                    {/* 显示内容和图片 */}
                                    {(item.content != "" && item.images.length > 0) &&
                                        <View>
                                            <Text className='content-text'>{item.content}</Text>
                                            <ScrollView scrollX className='content-scroll'>
                                                {item.images.map((mapItem, mapIndex) => {
                                                    return (
                                                        <Image key={mapIndex} className='content-img' src={mapItem}></Image>
                                                    )
                                                })
                                                }
                                            </ScrollView>
                                        </View>
                                    }
                                    {/* 单图片 */}
                                    {(item.images.length > 0 && item.content == '') &&
                                        <ScrollView scrollX className='content-scroll'>
                                            {item.images.map((mapItem, mapIndex) => {
                                                return (
                                                    <Image key={mapIndex} className='content-img' src={mapItem}></Image>
                                                )
                                            })
                                            }
                                        </ScrollView>
                                    }
                                    {/* 单文字 */}
                                    {(item.images.length == 0 && item.content != '') &&
                                        <Text className='content-text'>{item.content}</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    )
                })

                }

            </View>
        )
    }
}