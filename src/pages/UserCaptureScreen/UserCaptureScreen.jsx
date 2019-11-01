import Taro,{Component} from '@tarojs/taro'
import {View,Input,Text,Button,MovableArea,MovableView,Image} from '@tarojs/components'
import './UserCaptureScreen.css'

export default class UserCaptureScreen extends Component{
    constructor(props){
        super(props)
    }

    state = {
        userCaptureScreen:'用户没有截屏',
        game:'游戏进行中',
        phone:'0000'
    }

    //生命周期
    componentDidShow(){
        //监测用户截屏（被动api）
        Taro.onUserCaptureScreen(()=>{
            this.setState({
                userCaptureScreen:'用户截屏了'
            })
            console.log('用户截屏了')
        })
    }

    //长振动
    vibrateLong(){
        Taro.vibrateLong({})
    }

    //短振动
    vibrateShort(){
        Taro.vibrateShort({})
    }

    //飞机移动事件
    movableViewChange(e){
        let x = e.detail.x
        let y = e.detail.y
        let areaWidth = 0
        let areaHeight = 0
        let areaViewWidth = 0
        let areaViewHight = 0
        let xRight = 0
        let yTop = 0
        //得到当前控件的实例对象的API
        // Taro.createSelectorQuery
        let query = Taro.createSelectorQuery()
        query.select('.movable-area').boundingClientRect()
        query.exec(res=>{
           areaWidth = res[0].width
           areaHeight = res[0].height

           query.select('.movable-view').boundingClientRect()
           query.exec(res2=>{
              areaViewWidth = res2[1].width
              areaViewHight = res2[1].height
              xRight = areaWidth - areaViewWidth
              yTop =parseFloat(areaHeight - areaViewHight).toFixed(1)
              this.setMessage(x,y,xRight,yTop)
           }) 
        })
    }

    setMessage(x,y,xRight,yTop){
        let message = '游戏进行中'
        if(x == '0'){
            message = '碰左边，游戏结束'
        }else if(x == xRight){
            message = '碰右边，游戏结束'
        }else if(y == '0'){
            message = '碰上边，游戏结束'
        }else if(y == yTop){
            message = '碰下边，游戏结束'
        }
        if(message != '游戏进行中'){
            Taro.vibrateLong()
        }
        this.setState({
            game:message
        })
    }

    //拨打电话
    makePhoneCall(){
        console.log(this.state.phone == '0000')
        if(this.state.phone == '0000'){
            Taro.showToast({
                title:'您还没有电话',
                icon:"none",
                duration:1000
            })
        }else{
            let params = {
                phoneNumber:this.state.phone
            }
            Taro.makePhoneCall(params)
        }
    }

    //获取电话
    getPhone(e){
        console.log(e)
        this.setState({
            phone:e.detail.value
        })
    }

    render(){
        return(
            <View className='container'>
                UserCaptureScreen
                <View className='page-section'>
                    <View className='page-title'>用户截屏</View>
                    <Text>{this.state.userCaptureScreen}</Text>
                </View>
                {/* 手机振动 */}
                <View className='page-section'>
                    <View className='page-title'>设备振动</View>
                    <Button onClick={this.vibrateLong}>使用手机发生较长振动</Button>
                    <Button onClick={this.vibrateShort}>使用手机发生短振动</Button>
                </View>
                {/* 移动组件的操作 */}
                <View className='page-section'>
                    <View className='page-title'>
                        游戏进程：
                        <Text>{this.state.game}</Text>
                    </View>
                </View>
                <MovableArea className='movable-area'>
                    <MovableView onChange={this.movableViewChange} direction='all' className='movable-view'>
                        <Image src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1486821840,4142660472&fm=26&gp=0.jpg'></Image>
                    </MovableView>
                </MovableArea>
                {/* 打电话 */}
                <View className='page-section'>
                    <View className='page-title'>
                        打电话
                    </View>
                    <View>
                        <Input type='number' onBlur={this.getPhone} placeholder='请输入电话' />
                        <Button onClick={this.makePhoneCall}>拨打电话</Button>
                    </View>
                </View>
            </View>
        )
    }
}