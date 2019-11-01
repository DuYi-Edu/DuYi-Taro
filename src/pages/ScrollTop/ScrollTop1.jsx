import Taro,{Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import './ScrollTop1.css'

export default class ScrollTop1 extends Component{
    state = {
        showBtn: true
    }

    //系统函数-当页面在滚动过程中的触发
    onPageScroll(e){
        console.log(e)
        if(e.scrollTop > 100){
            //当页面距离顶部大于100px时，则需要显示回到顶部按钮
            this.setState({
                showBtn: false
            })
        }else{
            this.setState({
                showBtn: true
            })
        }
    }

    //回到顶部
    goTop(){
        //判断是否系统基础库有此功能
        if(Taro.pageScrollTo){
            //存在
            Taro.pageScrollTo({
                scrollTop:0,
                duration:500,
            }).then(()=>console.log('已经到达页面顶部'))
            .catch(()=>console.log('未完成滚动操作'))
        }else{
            Taro.showToast({
                title:'系统不支持',
                icon:'none'
            })
        }
    }

    render(){
        return (
            <View>
                <View className='page'>
                    <Text>Top</Text>
                </View>
                <View className='gotop' hidden={this.state.showBtn}>
                    <View onClick={this.goTop}>回到顶部</View>
                </View>
            </View>
        )
    }
}