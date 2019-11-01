import Taro,{Component} from '@tarojs/taro'
import {View,Camera,Button,Image} from '@tarojs/components'

export default class CameraContorl extends Component{
    constructor(props){
        super(props)
    }

    state = {
        src: ''
    }

    //拍照触发
    takePhoto(){
        let that = this
        //获取相机对象
        const ctx = Taro.createCameraContext()
        //通过接口调用拍照方法
        ctx.takePhoto({
            quality:'high',
            success(res){
                //console.log(res)
                let _tempImagePath = res.tempImagePath
                that.setState({
                    src: _tempImagePath
                })
            }
        })
    }

    render(){
        return(
            <View>
                <View>Camera</View>
                <Camera mode='normal' devicePosition='back' flash='auto' frame-size='large' style='width:100%;height:600rpx'></Camera>
                <Button type='primary' onClick={this.takePhoto}>拍照</Button>
                <Image src={this.state.src}></Image>
            </View>
        )
    }
}