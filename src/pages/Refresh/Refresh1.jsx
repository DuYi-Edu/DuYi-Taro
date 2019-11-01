import Taro,{Component} from '@tarojs/taro'
import {View,Image,Text} from '@tarojs/components'
import './Refresh1.css'

export default class Refresh1 extends Component{
    state = {
        imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563768801931&di=def9483aafdaba2b1394c9b62d71b39e&imgtype=0&src=http%3A%2F%2Fi8.hexunimg.cn%2F2012-10-17%2F146862535.jpg',
        imgTitle:'计算机的发展史'
    }

    //系统事件，当enablePullDownRefresh设置为true的时候，直接触发
    onPullDownRefresh(){
        //loading
        Taro.showLoading({
            title:'正在加载...'
        })

        setTimeout(()=>{
            this.setState({
                imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3833654612,1866622642&fm=26&gp=0.jpg',
                imgTitle:'旧照片的记忆'
            })
            //调用停止事件更新的下拉接口
            Taro.stopPullDownRefresh()
            //停止loading
            Taro.hideLoading()
        },1000)
        
    }

    config = {
        navigationBarTitleText: '刷新操作',
        enablePullDownRefresh:true
    }

    render(){
        return(
            <View className='container'>
                <View className='page-section'>
                    <Image src={this.state.imgUrl}></Image>
                    <Text>{this.state.imgTitle}</Text>
                </View>

            </View>
        )
    }
}