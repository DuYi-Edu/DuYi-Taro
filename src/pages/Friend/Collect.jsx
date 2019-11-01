import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text,ScrollView} from '@tarojs/components'
import './Collect.css'

const db = Taro.cloud.database()
export default class Collect extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        openid: '',
        page: 0,
        pageSize: 5,
        totalCount: 0,
        collects: {},
        topics: []
    }

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '社交圈',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6',
    }

    componentDidShow() {
        //获取数据(为了获取openid方法之一)
        this.loginTime()
    }

    loginTime() {
        let that = this
        db.collection("loginTime").add({
            data: {
                login: new Date()
            }
        }).then(res => {
            db.collection('loginTime')
                .doc(res._id)
                .get()
                .then(loginTimeRes => {
                    that.setState({
                        openid: loginTimeRes._openid
                    }, () => {
                        //获取收藏数据
                        db.collection('collectDemo')
                            .where({ _openid: that.state.openid })
                            .get()
                            .then(collectDemoRes => {
                                that.setState({
                                    collects: collectDemoRes.data
                                }, () => {
                                    //获取内容根据刚获得的collects中的ID
                                    that.getTopicFromCollects()
                                })
                            })
                    })
                })

        })
    }

    //获取内容根据id
    getTopicFromCollects() {
        let that = this
        for (let i in this.state.collects) {
            let topicId = this.state.collects[i]._id
            //去topicDemo表找数据
            db.collection('topicDemo')
                .doc(topicId)
                .get()
                .then(res => {
                    this.setState({
                        topics: that.state.topics.concat(res.data)
                    }, () => {
                        console.log('stateTopics', that.state.topics)
                    })
                })
        }

    }

    render() {
        return (
            <View>
                {this.state.topics.map((item, index) => {
                    return (
                        <View key={index} className='container'>
                            <View className='container-content'>
                                <View className='user-info'>
                                    <Image className='user-head' src={item.user.avatarUrl} />
                                </View>
                                <View className='user-name-time'>
                                    <View className='user-name'>{item.user.nickName}</View>
                                    <View className='user-publish-time'>{String(item.date.toLocaleDateString())}</View>
                                </View>
                                {/* 图文 */}
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