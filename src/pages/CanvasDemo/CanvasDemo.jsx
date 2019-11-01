import Taro,{Component} from '@tarojs/taro'
import {View,Canvas} from '@tarojs/components'
import './CanvasDemo.css'

let startX = 0 //保存x坐标轴变量
let startY = 0 //保存y坐标轴变量
let isClear = false //是否启用橡皮擦标记
//开始创建上下文对象,利用此对象进行绘制(特别注意，对于绘制图画这个功能，只有微信小程序有，所以不能用Taro来调用，只能用wx对象)
const context = wx.createContext()

export default class CanvasDemo extends Component{
    constructor(props){
        super(props)
    }

    state = {
        pen:3,//笔触的粗细（默认值）
        color:'#000',//画笔颜色（默认值）
    }

    config = {
        navigationBarTitleText: '涂鸦板'
    }

    componentDidShow(){

    }

    //按下
    touchStart(e){
        //获取触摸点的坐标
        console.log(e)
        startX = e.changedTouches[0].x
        startY = e.changedTouches[0].y
        
        //判断是否启用了橡皮擦功能 true表示清除，false表示画画
        if(isClear){
            //清除
        }else{
            //设置绘制样式（笔色）
            context.setStrokeStyle(this.state.color)
            //设置线条粗细
            context.setLineWidth(this.state.pen)
            //设置让线条圆润
            context.setLineCap('round')
            //开始绘制
            context.beginPath()
        }
    }

    //移动
    touchMove(e){
        //收取当前的x和y坐标
        let startX1 = e.changedTouches[0].x
        let startY1 = e.changedTouches[0].y
        //判断是否为橡皮擦
        if(isClear){
            //是
        }else{
            //不是
            context.moveTo(startX,startY)
            //获得第二个点坐标
            context.lineTo(startX1,startY1)
            //绘制
            context.stroke()
            //重新把结束坐标赋值给起始坐标位
            startX = startX1
            startY = startY1
        }
        //调用微信的画画布接口完成最后的绘制
        wx.drawCanvas({
            canvasId:'myCanvas',
            reserve:true,
            actions:context.getActions() //绘制动作的整个结构
        })
        
    }

    //释放结束
    touchEnd(){

    }

    //绘制线条
    penSelect(fontSize,e){

    }

    //笔触颜色设定
    colorSelect(fontColor,e){

    }

    //橡皮（使用其他颜色填充）
    clearCanvas(){

    }

    render(){
        return(
            <View className='container'>
                {/* 画布区域 */}
                <View className='canvas-area'>
                    <Canvas 
                        canvasId='myCanvas' 
                        className='myCanvas' 
                        disableScroll='false'
                        onTouchStart={this.touchStart}
                        onTouchMove={this.touchMove}
                        onTouchEnd={this.touchEnd}
                    ></Canvas>
                </View>
                {/* 画布工具区域 */}
                <View className='canvas-tools'>
                    {/* 细笔绘制 */}
                    <View className='box box1' onClick={this.penSelect.bind(this,'5')}></View>
                    {/* 粗笔绘制 */}
                    <View className='box box2' onClick={this.penSelect.bind(this,'15')}></View>
                    {/* 红色笔 */}
                    <View className='box box3' onClick={this.colorSelect.bind(this,'#c03')}></View>
                    {/* 黄色笔 */}
                    <View className='box box4' onClick={this.colorSelect.bind(this,'#f90')}></View>
                    {/* 橡皮 */}
                    <View className='box box5' onClick={this.clearCanvas}></View>
                </View>
            </View>
        )
    }
}