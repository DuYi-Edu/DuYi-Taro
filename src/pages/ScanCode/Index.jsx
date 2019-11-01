/* eslint-disable react/no-unused-state */
import Taro,{Component} from '@tarojs/taro'
import {View,Button,Navigator} from '@tarojs/components'
import './Index.css'

export default class Index extends Component{
    constructor(props){
        super(props)
    }

    state = {
        scanType:{
            'WX_CODE':'微信小程序',
            'QR_CODE':'二维码',
            'EAN_8':'条形码（EAN_8）',
            'EAN_13':'条形码(EAN_13)'
        },
        scanResult:{
            isShow:false,
            type:'',
            text:'',
            msg:''
        }
    }

    config = {
        navigationBarTitleText: '扫码操作'
    }

    //扫一扫
    onScan(){
        //Taro扫码接口
        Taro.scanCode({
            success:(res)=>{
                console.log('res',res)
                let msg = res.rawData
                if(res.scanType === 'WX_CODE' && res.result ===''){
                    msg = '您扫了微信二维码'
                }
                this.setState({
                    scanResult:{
                        isShow: true,
                        type: this.state.scanType[res.scanType],
                        text: res.result,
                        msg,
                    }
                },()=>{
                    console.log(this.state.scanResult)
                })
                //注意setState是异步的数据更新
            }
        })
    }

    //跳转至生成二维码页面
    gotoCreateScan(){
        Taro.navigateTo({
            url:'./CreateScan'
        })
    }

    //复制
    onCopy(){
        //复制到剪切板
        Taro.setClipboardData({
            data:this.state.scanResult.text,
            success:(res)=>{
                //tip
                Taro.showToast({
                    title:'复制成功',
                    icon:'success',
                    duration:2000
                })
            }
        })
    }

    render(){
        return(
            <View>
                {/* 扫描结果 */}
                <View style={'display:'+(this.state.scanResult.isShow?'block':'none')} className='result'>
                    <View>扫码结果</View>
                    <View>类型:{this.state.scanResult.type}</View>
                    <View>内容：{this.state.scanResult.text}</View>
                </View>
                {/* 复制内容 */}
                <View className='copy'>
                    <Navigator url='' onClick={this.onCopy} style={'display:'+(this.state.scanResult.isShow?'block':'none')}>复制</Navigator>
                </View>
                {/* 扫码按钮 */}
                <View>
                    <Button type='primary' onClick={this.onScan}>扫一扫</Button>
                    <Button type='primary' onClick={this.gotoCreateScan}>生成二维码</Button>
                </View>
            </View>
        )
    }
}