import Taro,{Component} from '@tarojs/taro'
import {View,Button,Canvas} from '@tarojs/components'

export default class CanvasControl extends Component{
    constructor(){
        super(...arguments)
        //获取画布的上下文对象
        this.canvasCtx = wx.createCanvasContext('firstCanvas')
    }

    //绘制
    drawCanvas(){
        this.canvasCtx.setStrokeStyle("#00ff00")
        this.canvasCtx.setLineWidth(5)
        this.canvasCtx.rect(0,0,200,200)
        this.canvasCtx.stroke()

        this.canvasCtx.setStrokeStyle("#ff0000")
        this.canvasCtx.setLineWidth(2)
        this.canvasCtx.moveTo(160,100)
        this.canvasCtx.arc(100,100,60,0,2*Math.PI,true)
        this.canvasCtx.moveTo(140,100)
        this.canvasCtx.arc(100,100,40,0,2*Math.PI,false)
        this.canvasCtx.moveTo(85,80)
        this.canvasCtx.arc(80,80,5,0,2*Math.PI,true)
        this.canvasCtx.moveTo(125,80)
        this.canvasCtx.arc(120,80,5,0,2*Math.PI,true)
        this.canvasCtx.stroke()
        this.canvasCtx.draw()
    }

    render(){
        return (
            <View>
                <Canvas style='width:300px;height:200px' canvasId='firstCanvas' />
                <Button onClick={this.drawCanvas}>DARW</Button>
            </View>
        )
    }
}