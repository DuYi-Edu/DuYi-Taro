// 重力加速计-api-摇一摇功能
import Taro,{Component} from '@tarojs/taro'
import {View,Image,Text,Button} from '@tarojs/components'
import './Accelerometer.css'

export default class Accelerometer extends Component{
    /**
     * startAccelerometer: 开始监听加速计
     * stopAccelerometer: 停止监听加速计
     * onAccelerometerChange: 监听加速计的数据变化事件，频度startAccelerometer的interval参数决定
     * 可以获取x y z三轴的数值
     */
    
    //构造函数时解决类的对象生成和基类调用的规则
    constructor(){
        super(...arguments)
    }

    state = {
        img_url: 'https://www.demomaster.cn/eatbar/public/static/img/yaoyiyao/img_yaoyiyao.png',
        loading:'https://www.demomaster.cn/eatbar/public/static/img/yaoyiyao/small_loading.gif',
        hasResult: -1,
        bar_state:0,
        winWidth:0,
        winHeight:0

    }

    //生命周期操作
    componentDidShow(){
        let that = this
        //初始化动作
        that.initAnimation()
        //重力加速度
        Taro.onAccelerometerChange(res=>{
            if(res.x>.7 && res.y > .7){
                that.startAnimiation()
            }
        })
        Taro.getSystemInfo({
            success:(res)=>{
                that.setState({
                    winWidth:res.windowWidth,
                    winHeight:res.windowHeight
                })
            }
        })
    }

    config={
        navigationBarTitleText: '重力加速计'
    }

    //初始化事件
    initAnimation(){
        let that = this
        //实例化一个动画
        this.animation1 = Taro.createAnimation({
            //动画持续时间，单位ms,默认值400
            duration:400,
            /**
             * linear 动画一直均速
             * ease 从匀速到加速再到匀速
             * ease-in 缓慢到均速
             * ease-in-out 从缓慢到均速再到缓慢
             * 
             * step-start 动画一开始就跳到100%直到动画持续时间结束，一闪而过
             */
            timingFunction:'ease',
            //延迟多长时间开始
            //delay:100

            /**
             * 以生命为基点做动画
             * left,center right是水平方向取值，对应的百分值为left=0%
             * top center bottom是垂直方向的取值，
             */
            transformOrigin:'left top 0'
        })
        this.animation2 = Taro.createAnimation({
            duration:400,
            timingFunction:'ease',
            transformOrigin:'left top 0'
        })
    }

    //开始（摇晃）动画
    startAnimiation(){
        let that = this
        //x轴位移100px
        let h1 = '35%'
        let h2 = '65%'
        if(this.state.bar_state == 1){
            h1 ="40%"
            h2 ="40%"
            setTimeout(()=>{
                that.setState({
                    bar_state:0,
                    hasResult:0
                })   
                setTimeout(()=>{
                    that.setState({
                        hasResult:1
                    })
                },4000)
            },400)
        }else{
            h1 = "25%"
            h2 = "55%"
            that.setState({
                bar_state:1
            })
            setTimeout(()=>{
                that.startAnimiation()
            },600)
        }
        that.animation1.height(h1).step()
        that.animation2.top(h2).step()
        that.setState({
            animation1:that.animation1.export(),
            animation2:that.animation2.export()
        })
    }

    render(){
        return(
            <View className='panel_root'>
                {/* 上半部的区域 */}
                <View className='view_top' animation={this.state.animation1}>
                    {/* 上半部图片 */}
                    <Image className='img_top' src={this.state.img_url}></Image>
                </View>
                {/* 下半部区域 */}
                <View className='view_bottom' animation={this.state.animation2}>
                    {/* 下半部图片 */}
                    <Image className='img_bottom' src={this.state.img_url}></Image>
                    {/* 正在搜索显示区域 */}
                    <View className='panel_bottom'>
                        {/* loading */}
                        <View className='panel_loading' style={'display:'+(this.state.hasResult == 0 ? 'block' : 'none')}>
                            <Image className='img_loading' src={this.state.loading}></Image>
                            <Text>正在搜索同一时刻摇晃的人</Text>
                        </View>
                        {/* 搜索成功后的显示 */}
                        <View className='panel_result' style={'display:'+(this.state.hasResult == 1 ? 'block' : 'none')}>
                            美女小姐姐
                        </View>
                    </View>
                </View>
                {/* 测试按钮 */}
                <Button className='btn_test' onClick={this.startAnimiation.bind(this)}>测试</Button>
            </View>
        )
    }
}
