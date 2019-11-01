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
        startX = e.changedTouches[0].x
        startY = e.changedTouches[0].y
        
        //判断是否启用了橡皮擦功能 true表示清除，false表示画画
        if(isClear){
            //清除
            //设置线条样式，次数设置为画布的背景颜色，橡皮擦原理就是：利用查过的地方填充画布的背景色
            context.setStrokeStyle("#ddd") //设置橡皮颜色
            context.setLineCap('round') //设置线条两端的样式
            context.setLineJoin('round') //设置两线相交处的样式
            context.setLineWidth(this.state.pen) //设置线条宽度
            context.save() //保存当前信息
            context.beginPath() //开始绘制路径
            context.arc(startX,startY,5,0,2*Math.PI,true) //添加一个弧形路径到当前路径，顺时针绘制，这里总共画了360度，也就是一个小圆弧
            context.fill() //对当前路径进行填充
            context.restore() //恢复之前保存过的坐标轴

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
            context.save() //保存当前坐标的信息
            context.moveTo(startX,startY) //把路径移动到画布中的指定点，但不创建线条
            context.lineTo(startX1,startY1) //添加一个新坐标点，然后在画布中创建从该店到最后指定点的线条
            context.stroke() //对当前路径进行描边
            context.restore() //恢复之前保存过的坐标轴信息
            //把结束坐标赋值到开始坐标
            startX = startX1
            startY = startY1
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
    touchEnd(e){
        startX = e.changedTouches[0].x
        startY = e.changedTouches[0].y
    }

    //绘制线条
    penSelect(fontSize,e){
        //直接修改state中的pen
        this.setState({
            pen: parseInt(fontSize)
        })
        //改变现在isClear让其不为橡皮擦
        isClear = false
    }

    //笔触颜色设定
    colorSelect(fontColor,e){
        this.setState({
            color: fontColor
        })
        isClear = false
    }

    //橡皮（使用其他颜色填充）
    clearCanvas(){
        //橡皮擦的切换
        isClear = !isClear
        Taro.showToast({
            title: isClear ? "橡皮擦开启" : "橡皮擦关闭",
            icon:'none',
            duration:1000
        })
        
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