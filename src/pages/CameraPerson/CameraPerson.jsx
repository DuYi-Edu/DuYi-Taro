import Taro,{Component} from '@tarojs/taro'
import {View,Camera,CoverView,CoverImage} from '@tarojs/components'
import './CameraPerson.css'

export default class CamearPerson extends Component{
    constructor(props){
        super(props)
    }

    state = {
        src:''
    }

    config = {
        navigationBarTitleText: '人形拍照'
    }

    //拍照
    photograph(){
        let that = this
        //获取拍照对象
        const ctx = Taro.createCameraContext()
        //拍摄
        ctx.takePhoto({
            quality:'high',
            success(res){
                that.setState({
                    src: res.tempImagePath
                },()=>{
                    //数据存储
                    Taro.setStorage({
                        key:'photoPeople',
                        data: res.tempImagePath
                    })
                    //跳转页面(重定向)
                    Taro.redirectTo({
                        url:'/pages/CameraPerson/ShowPhoto'
                    })
                })
            }
        })
    }

    render(){
        return(
            <Camera devicePosition='front' className='camera-cls'>
                <CoverView className='main-tiips'>对准人形</CoverView>
                <CoverImage className='verifycode-cover' src='../../static/images/rx.png'></CoverImage>
                <CoverImage className='red-point' onClick={this.photograph} src='../../static/images/hd.png'></CoverImage>
            </Camera>
          
        )
    }
}