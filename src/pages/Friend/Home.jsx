import Taro,{Component} from '@tarojs/taro'
import {View,Image,Text,ScrollView} from '@tarojs/components'
import './Home.css'

export default class Home extends Component{
    constructor(props){
        super(props)
    }

    state = {}

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '社交圈',
        navigationBarTextStyle: 'white',
        backgroundColor:'#5495e6',
        enablePullDownRefresh:true
    }

    componentDidShow(){

    }

    //单击每项的查看具体信息触发
    onItemClick(){

    }

    render(){
        return(
            <View>
                <View className='container' onClick={this.onItemClick}>
                    <View className='container-content'>
                        <View className='user-info'>
                            {/* 用户头像 */}
                            <Image className='user-head' src='../../static/images/tv.png' />
                            <View className='user-name-time'>
                                <View className='user-name'>用户名字</View>
                                <View className='user-publish-time'>Thu Aug 08 2019 17:05:05 GMT+0800(中国标准时间)</View>
                            </View>
                        </View>
                        {/* 显示内容和图片 */}
                        <View className='content'>
                            <Text className='content-text'>我的第一个发布内容</Text>
                            <ScrollView scrollX className='content-scroll'>
                                <Image className='content-img' src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1691405178,3610831322&fm=26&gp=0.jpg'></Image>
                                <Image className='content-img' src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1691405178,3610831322&fm=26&gp=0.jpg'></Image>
                                <Image className='content-img' src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1691405178,3610831322&fm=26&gp=0.jpg'></Image>
                                <Image className='content-img' src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1691405178,3610831322&fm=26&gp=0.jpg'></Image>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}