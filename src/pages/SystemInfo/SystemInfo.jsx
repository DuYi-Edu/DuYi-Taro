import Taro,{Component} from '@tarojs/taro'
import {View,Button,Text,Form,Input} from '@tarojs/components'
import './SystemInfo.css'

export default class SystemInfo extends Component{

    state = {
        mobile:'none',
        system:'none',
        userWifiName:'',
        userWifiPwd:'',
        wifiList:[]
    }

    componentDidShow(){
        const arrayBuffer = new Uint8Array([11, 22, 33])
        const base64 = Taro.arrayBufferToBase64(arrayBuffer)
        console.log(base64)
    }


    //Taro.canUse
    canIUse(){
        //对象的属性和方法
        console.log(Taro.canIUse('console.log'))
        console.log(Taro.canIUse('Image.src'))
        console.log(Taro.canIUse('Image.path'))
        //对接口参数，回调或者返回值
        console.log(Taro.canIUse('showToast.object.image'))
        console.log(Taro.canIUse('request.object.method.GET'))
        //组件的属性
        console.log(Taro.canIUse('live-player'))
    }

    //获取系统信息（移动端的系统的信息）
    getSystemInfo(){
        Taro.getSystemInfo({
            success:res=>{
                console.log(res)
                this.setState({
                    mobile:res.model,
                    system:res.system
                })
            }
        })
    }

    //搜索WIFI
    startSearch(){
        const getWfiList = ()=>{
            //会被跳转到微信的设置页面
            Taro.getWifiList({
                success:(res)=>{
                    //成功跳转到后的返回
                    console.log('getWifiList',res)
                    //当手机切换到设置->无线局域网，则会发起如下事件的回调，并得到当前的所有wifi的列表
                    Taro.onGetWifiList((res)=>{
                        console.log('onGetWifiList',res)
                        const wifiList = res.wifiList.map(wifi =>{
                            const strength = Math.ceil(wifi.signalStrength * 4)//signalStrength信号强度
                            return Object.assign(wifi,{strength})
                        })
                        this.setState({
                            wifiList
                        })
                        
                    })
                }
            })
        }

        const startWifi = () =>{
            Taro.startWifi({
                success:getWfiList,
                fail(res){
                    console.error(res)
                }
            })
        }

        let that = this
        //获取系统信息
        Taro.getSystemInfo({
            
            success(res){
                const isIOS = res.platform === 'ios'
                if(isIOS){
                    Taro.showModal({
                        title:'提示',
                        content:'由于系统限制，ios用户请手动先进入系统wifi页面，然后返回小程序',
                        showCancel:false,
                        success(){
                            startWifi()
                        }
                    })
                    return
                }
                startWifi()
            }
        })

    }

    //连接WIFI(Form表单的提交)
    connectWIFI(e){
        let that = this
        console.log(e)
        this.setState({
            userWifiName: e.detail.value.wifiname,
            userWifiPwd: e.detail.value.wifipwd
        })
        //判断当前手机是否支持wifi方式小程序链接
        Taro.getSystemInfo({
            success:(res)=>{
                let system = ''
                if(res.platform == 'android'){
                    system = parseInt(res.system.substr(8))
                }
                if(res.platform == 'ios'){
                    system = parseInt(res.system.substr(4))
                }
                //判断系统和版本号
                if(res.platform == 'andorid' && system < 6){
                    //提示手机不支持
                    Taro.showToast({
                        title:'安卓当前手机版本不支持'
                    })
                    return
                }
                if(res.platform == 'ios'  && system < 11.2){
                    Taro.showToast({
                        title:'苹果手机当前版本不支持'
                    })
                    return
                }
                //初始化wifi模板
                that.startWifi()
            }
        })
    }

    //初始化Wifi模板
    startWifi(){
        let that = this
        Taro.startWifi({
            success(){
                that.connected()
            }
        })
    }

    //连接操作
    connected(){
        Taro.connectWifi({
            SSID: this.userWifiName,//wifi账户名称
            password: this.userWifiPwd,//wifi连接密码
            success(res){
                Taro.showToast({
                    title:'wifi连接成功',
                    duration:2000
                })
            },
            fail(res){
                Taro.showToast({
                    title:'连接失败',
                    duration:2000
                })
            }
        })
    }

    //重置表单
    formReset(){

    }



    render(){
        return(
            <View>
                SystemInfo
                <Button onClick={this.canIUse}>CanIUse</Button>
                <Button onClick={this.getSystemInfo}>getSystemInfo</Button>
                <View>您的手机为：{this.state.mobile}</View>
                <View>您的手机系统为：{this.state.system}</View>

                {/* Wifi */}
                <View className='container'>
                    <View className='text'>一键连接WIFI</View>
                    <Form onSubmit={this.connectWIFI} onReset={this.formReset}>
                        <View className='form'>
                            <View className='section'>
                                <Text>wifi账户</Text>
                                <Input placeholder='请输入wifi账户' name='wifiname' />
                            </View>
                            <View className='section'>
                                <Text>wifi密码</Text>
                                <Input placeholder='请输入wifi密码' name='wifipwd' password />
                            </View>
                            <Button formType='submit' type='primary'>连接WIFI</Button>
                            <Button onClick={this.startSearch}>搜索附件的wifi</Button>
                        </View>
                        {/* 显示wifi列表 */}
                        <View> 
                            {
                               this.state.wifiList.map((item,index)=>{
                                   return(
                                        <View taroKeys={index}>{item.SSID}</View>
                                   )
                               })
                            }
                        </View>
                    </Form>
                </View> 
            </View>
        )
    }
}