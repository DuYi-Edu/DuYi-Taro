import Taro,{Component} from '@tarojs/taro'
import {View,Image,Text,ScrollView} from '@tarojs/components'
import './History.css'

const db = Taro.cloud.database()
export default class History extends Component{
    constructor(props){
        super(props)
    }

    state = {
        openid:'',
        page: 1,
        pageSize: 5,
        totalCount: 0,
        topics:[]
    }

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '社交圈',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6',
        enablePullDownRefresh: true
    }

    //按住下拉
    onPullDownRefresh(){
        Taro.showNavigationBarLoading()
        this.getMyData()
    }

    //下拉触底
    onReachBottom(){
        let that = this
        let temp = []
        if(this.state.topics.length < this.state.totalCount){
            Taro.showLoading()
            //可以继续获取数据
            db.collection('topicDemo')
                .where({
                    _openid: this.state.openid
                })
                .skip(this.state.page * this.state.pageSize)
                .order('date','desc')
                .get()
                .then(res=>{
                    if(res.data.length > 0){
                        for(let i=0;i>res.data.length;i++){
                            temp.push(res.data[i])
                        }
                        let totalTopic = that.state.topics.concat(temp)
                        that.setState({
                            topics:totalTopic
                        })
                    }else{
                        Taro.showToast({
                            title:'没有数据了'
                        })
                    }
                    Taro.hideLoading()
                })
        }else{
            Taro.showToast({
                title:'没有更多数据了'
            })
        }
    }

    componentDidShow(){
        this.getMyData()
    }

    //我的数据
    getMyData() {
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
                        db.collection('topicDemo')
                            .where({ _openid: that.state.openid })
                            .limit(that.state.pageSize)
                            .orderBy('date','desc')
                            .get()
                            .then(topicDemo => {
                                that.setState({
                                    topics: topicDemo.data
                                },()=>{
                                    console.log('that.state.topics',that.state.topics)
                                    Taro.hideNavigationBarLoading()
                                    Taro.stopPullDownRefresh()
                                })
                            })
                            .catch(err=>{console.err(err)})
                    })
                })

        })
    }

    render() {
        return (
            <View>
                {this.state.topics.map((item, sindex) => {
                    return (
                        <View  className='container'>
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
                                                        <Image className='content-img' src={mapItem}></Image>
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