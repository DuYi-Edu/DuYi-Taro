import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'


export default class Interactive extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        showModal: '还未选择',
        choose:'还未选择'
    }

    //显示showToast（显示消息提示框）
    //有模式的弹框：显示的时候无法再次操作页面
    actionShowToast() {
        let params = {
            title: '提示的内容',
            icon: 'success',
            duration: 5000,
            mask: true,
            image: '../../static/images/compass.png',
            success() {
                console.log('提示完成')
            },
            fail() {
                console.log('提示失败')
            },
            complete() {
                console.log('提示结束')
            }
        }
        Taro.showToast(params)

        setTimeout(() => {
            Taro.hideToast()
        }, 2000)
    }

    //显示showLoading
    //无模式：在显示内容的时候，可以继续操作页面
    actionShowLoading() {
        Taro.showLoading({
            title: '显示内容',
            mask: false,//是否透明
            success() {
                console.log('showLoading提示完成')
            },
            fail() {
                console.log('showLoading提示失败')
            },
            complete() {
                console.log('showLoading提示结束')
            }
        })

        //模拟时间周期结束，关闭Loading
        setTimeout(() => {
            //关闭
            Taro.hideLoading()
        }, 2000)
    }

    //模式对话框
    actionShowModal() {
        let that = this
        Taro.showModal({
            title: '提示',
            content: '现在您可以利用宝贵的时间来为我们做个调查吗',
            showCancel: true,
            cancelText: '我不要了',//最多4个字符
            cancelColor: '#f00',
            confirmText: '我知道了',//最多4个字符
            confirmColor: '#0f0',
            //模态框的事件回调是需要在点击操作以后才调用的
            success(res) {
                console.log('提示显示成功', res)
                if (res.confirm) {
                    that.setState({
                        showModal: '您知道了就好'
                    })
                } else {
                    that.setState({
                        showModal: '下次再见'
                    })
                }
            },
            fail(res) {
                console.log('提示显示错误')
            },
            complete(res) {
                console.log('提示显示完成')
            }
        })
    }

    //showActionSheet菜单制作
    //此功能可以在微信小程序，H5,React Native上都可以使用
    actionShowActionSheet(){
        let that = this
        let params = {
            itemList: ['演唱者','最新大碟','原创歌曲','每日排行'],
            itemColor: '#0f0'
        }
        Taro.showActionSheet(params)
            .then(res=>{
                that.setState({
                    choose: params.itemList[res.tapIndex]
                })
            })
            .catch(err=>console.log(err))
    }

    render() {
        return (
            <View>
                <View>Interactive</View>
                <View>
                    <View>showToast</View>
                    <Button type='primary' onClick={this.actionShowToast.bind(this)}>showToast</Button>
                </View>
                <View>
                    <View>showLoading</View>
                    <Button type='primary' onClick={this.actionShowLoading.bind(this)}>showLoading</Button>
                </View>
                <View>
                    <View>showModal：{this.state.showModal}</View>
                    <Button onClick={this.actionShowModal}>showModal</Button>
                </View>
                <View>
                    <View>showActionSheet菜单操作：{this.state.choose}</View>
                    <Button onClick={this.actionShowActionSheet}>showActionSheet</Button>
                </View>
            </View>
        )
    }
}