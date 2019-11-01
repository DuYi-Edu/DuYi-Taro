import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView, Button } from '@tarojs/components'
import './HomeDetail.css'

const db = Taro.cloud.database()
export default class HomeDetail extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        topic: {},
        id: '',
        openid: '',
        isLike: false,
        replys: []
    }

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '具体信息',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6'
    }

    componentDidShow() {
        let that = this
        this.setState({
            id: this.$router.params.id,
            openid: this.$router.params.openid
        }, () => {
            //获取单内容信息
            db.collection('topicDemo')
                .doc(that.state.id)
                .get({
                    success(res) {
                        console.log(res)
                        //填充state
                        that.setState({
                            topic: res.data
                        })
                    }
                })
            // 获取收藏喜欢状态
            db.collection('collectDemo')
                .where({
                    _openid: this.state.openid,
                    _id: this.state.id
                })
                .get({
                    success(res) {
                        console.log('collectDemo Result', res)
                        if (res.data.length > 0) {
                            //有喜欢此数据
                            that.refreshLikeIcon(true)
                        } else {
                            //未喜欢此数据
                            that.refreshLikeIcon(false)
                        }

                    }
                })
            // 获取回复列表
            that.getReply()
        })

    }

    //回复列表
    getReply() {
        let that = this
        db.collection('replayDemo')
            .where({
                t_id: this.state.id
            })
            .get()
            .then(res => {
                console.log('replayDemo res', res)
                that.setState({
                    replys: res.data
                })
            })
    }

    //是否为喜欢状态函数
    refreshLikeIcon(isLike) {
        //存储到state里面
        this.setState({
            isLike: isLike
        })
    }

    //回复操作
    onReplyClick() {
        //跳转
        Taro.navigateTo({
            url: `./Reply?id=${this.state.id}&openid=${this.state.openid}`
        })
    }

    //喜欢
    onLikeClick() {
        //直接从state拿isLike
        //console.log(this.state.isLike)
        if (this.state.isLike) {
            //已喜欢，取消收藏
            this.removeFormCollectServer()
        } else {
            //添加收藏
            this.saveToCollectionServer()
        }
    }

    //取消收藏
    removeFormCollectServer() {
        let that = this
        db.collection('collectDemo')
            .doc(this.state.id)
            .remove()
            .then(res => {
                console.log('remove collectDemo:', res)
                //重新刷新isLike
                that.refreshLikeIcon(false)
            })
    }

    //添加收藏
    saveToCollectionServer() {
        let that = this
        db.collection('collectDemo').add({
            data: {
                _id: this.state.id,
                date: new Date()
            },
            success(res) {
                console.log(res)//返回新记录_id
                //重新刷新切换喜欢图标
                that.refreshLikeIcon(true)
            }
        })
    }

    previewImg(imgUrl,e){
        Taro.previewImage({
           current:imgUrl,
           urls:[imgUrl]
        })
    }

    render() {
        return (
            <View className='container'>
                <View className='container-content'>
                    <View className='user-info'>
                        <Image className='user-head' src={this.state.topic.user.avatarUrl}></Image>
                        <View className='user-name-time'>
                            <View className='user-name'>{this.state.topic.user.nickName}</View>
                            <View className='user-publish-time'>{String(this.state.topic.date)}</View>
                        </View>
                    </View>

                    <View className='content'>
                        {/* 图+文信息 */}
                        {(this.state.topic.content != '' && this.state.topic.images.length > 0) &&
                            (
                                <View>
                                    <Text className='content-text'>{this.state.topic.content}</Text>
                                    <ScrollView scrollX className='content-scroll'>
                                        {this.state.topic.images.map((item, index) => {
                                            return (
                                                <Image key={index} className='content-img' src={item} onClick={this.previewImg.bind(this,item)}></Image>
                                            )
                                        })
                                        }
                                    </ScrollView>
                                </View>
                            )
                        }

                        {/* 单图片 */}
                        {(this.state.topic.content == '' && this.state.topic.images.length > 0) &&
                            (
                                <ScrollView scrollX className='content-scroll'>
                                    {this.state.topic.images.map((item, index) => {
                                        return (
                                            <Image key={index} className='content-img' src={item} onClick={this.previewImg}></Image>
                                        )
                                    })
                                    }
                                </ScrollView>
                            )
                        }
                        {/* 单文本 */}
                        {(this.state.topic.content != '' && this.state.topic.images.length == 0) &&
                            <Text className='content-text'>{this.state.topic.content}</Text>
                        }
                    </View>
                </View>

                {/* 回复列表 */}
                <View className='reply-content'>
                    <Text className='tip-text'>----以下是回复内容---</Text>
                    {/* 循环显示回复内容 */}
                    {this.state.replys.map((item, index) => {
                        return (
                            <Text key={index}>{index + 1}：{item.content}</Text>
                        )
                    })

                    }


                </View>

                {/* 是否喜欢 */}
                {this.state.isLike ? (
                    <View className='like-container' onClick={this.onLikeClick}>
                        <Image className='like-icon' src='../../static/images/topic-detail/like.png'></Image>
                        <Text className='like-text'>已喜欢</Text>
                    </View>
                ) : (
                        <View className='like-container' onClick={this.onLikeClick}>
                            <Image className='like-icon' src='../../static/images/topic-detail/unlike.png'></Image>
                            <Text className='like-text'>喜欢</Text>
                        </View>
                    )
                }
                {/* 回复 */}
                <View className='reply-container' onClick={this.onReplyClick}>
                    <Button>回复</Button>
                </View>
            </View>
        )
    }
}