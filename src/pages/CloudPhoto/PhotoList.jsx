import Taro,{Component} from '@tarojs/taro'
import {View,Text,Image} from '@tarojs/components'
import './PhotoList.css'

export default class PhotoList extends Component{
    constructor(props){
        super(props)
    }

    state = {
        dataList:[] //所有云存储数据列表
    }

    config = {}

    componentDidShow(){
        this.getCloudImagList()
    }

    //获取云端数据
    getCloudImagList(){
        
    }

    //点击相机图片，触发跳转发布
    gotoFabu(){
        //Taro.navigateBack()
        Taro.redirectTo({
            url:'/pages/CloudPhoto/Home'
        })
    }

    render(){
        return(
            <View className='container'>
                {/* map循环 */}
                <View className='page-section'>
                    <Text className='item-name'>上传人：xxx</Text>
                    <Text className='item-time'>上传时间：xxx</Text>
                    <Image className='img' src=''></Image>
                    <Image className='shanchu' src='../../static/images/delete.png'></Image>
                </View>

                <Image src='../../static/images/fabu.png' onClick={this.gotoFabu} className='fabu'></Image>
            </View>
        )
    }
}