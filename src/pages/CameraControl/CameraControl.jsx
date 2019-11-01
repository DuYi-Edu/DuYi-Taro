import Taro,{Component} from '@tarojs/taro'
import {View,Camera,Button,Image} from '@tarojs/components'

export default class CameraControl extends Component{
    constructor(){
        super(...arguments)
    }

    state={
        tempImagePath:''
    }

    //拍照
    takePhoto(){
        let that = this
        //创建相机上下文
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality:'high',
            success:(res)=>{
                console.log(res)
                that.setState({
                    tempImagePath:res.tempImagePath
                })
            }
        })
    }

    render(){
        return(
            <View>
                CameraControl
                {/* 刚开始打开页面时会有权限获取，获取摄像头和相机权限 */}
                <Camera devicePosition='back' mode='normal' flash='auto' frameSize='medium' style='width:100%;height:300px' />
                <Button onClick={this.takePhoto}>拍照</Button>
                <Image mode='widthFix' src={this.state.tempImagePath}></Image>
            </View>
        )
    }
}