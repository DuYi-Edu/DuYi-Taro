import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text, Input, Button } from '@tarojs/components'
import './Kuaidi.css'

export default class Kuaidi extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        kuaidiList: ['申通', 'EMS', '圆通'],//运单列表
        kuaidiListCode: ['shengtong', 'ems', 'yuantong'],//快递简称
        index: 0,
        orderCode: '',//实时运单号
        orderCodeList: [], //实时运单数据
        current: {
            context: '',
            time: ''
        },
        showResult:true//隐藏/显示结果状态
    }

    config = {
        navigationBarTitleText: '快递查询'
    }

    componentDidShow() {

    }

    //快递公司选择
    bindPickerChange(e) {
        this.setState({
            index: e.detail.value
        })
    }

    //实时获取运单号
    getOrderCode(e) {
        this.setState({
            orderCode: e.detail.value
        })
    }

    //查找快递
    searchKudidi() {
        //需要调用第三方接口来完成 快递鸟，快递100
        //同时需要调用reques api接口
        let that = this
        let kuaidiUrl = `http://www.kuaidi100.com/query?type=${this.state.kuaidiListCode[this.state.index]}&postid=${this.state.orderCode}`
        //loading
        Taro.showLoading()
        //Taro.request
        Taro.request({
            url: kuaidiUrl,
            method:'get',
            success(res) {
                console.log(res)
                that.setState({
                    orderCodeList: res.data.data,
                    current: {
                        context: res.data.data[0].context,
                        time: res.data.data[0].time
                    }
                },()=>{
                    that.setState({
                        showResult:false
                    })
                    Taro.hideLoading()
                })
            }
        })
    }

    render() {
        return (
            <View className='container'>
                <View className='page-area area-bg'>
                    <View className='row'>
                        <Picker mode='selector' onChange={this.bindPickerChange} value={this.state.index} range={this.state.kuaidiList}>
                            <View className='kuaidiCompany'>
                                快递当前选择：{this.state.kuaidiList[this.state.index]}
                            </View>
                        </Picker>
                    </View>
                    {/* 快递查询 */}
                    <View className='row'>
                        <Text>快递查询</Text>
                        <Input placeholder='快递单号' onInput={this.getOrderCode}></Input>
                        <View>
                            <Button onClick={this.searchKudidi}>查询</Button>
                        </View>
                    </View>
                </View>
                {/* 快递显示列表 */}
                <View hidden={this.state.showResult} className='current-area'>
                    <View>当前状态：{this.state.current.context}</View>
                    <View>时间：{this.state.current.time}</View>
                </View>
                {/* 快递列表 */}
                {
                    this.state.orderCodeList.map((item, index) => {
                        return (
                            <View key={index}>
                                <View>状态：{item.context}</View>
                                <View>时间：{item.time}</View>
                            </View>
                        )
                    })
                }

            </View>
        )
    }
}