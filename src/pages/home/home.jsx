import Taro, { Component } from '@tarojs/taro'
import { View, MovableArea, MovableView,Video,CoverView,CoverImage } from '@tarojs/components'
import './home.css'

export default class Home extends Component {
    play(){
        //做视频的播放功能
        console.log('video play')
        //获取视频对象
        //微信小程序
        wx.createVideoContext("myVideo").play()
    }

    render() {
        return (
            <View>
                {/* 视图容器 */}
                {/* View */}
                <View className="font-red">123</View>
                <view>456 </view>
                <div>789</div>
                {/* ScrollView */}
                <View>可以上下左右滑动的控件，案例重点为顶部滑动不换行菜单</View>
                {/* Swiper、SwiperItem 可滑动区域 案例重点1.轮播图，2.滑动页面*/}
                {/* MovableView 可移动区域  案例，动画游戏的手指拖动，飞机游戏*/}
                <MovableArea className="movable">
                    <MovableView className="movableView" direction="horizontal">
                        <Image src="http://img2.imgtn.bdimg.com/it/u=1486821840,4142660472&fm=26&gp=0.jpg"></Image>
                    </MovableView>
                </MovableArea>
                {/* CoverView 在原生小程序上的某一个区块的覆盖，案例video*/}
                <Video id="myVideo" src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'>
                    <CoverView className="controls">
                        <CoverView className='play' onClick={this.play}>
                            <CoverImage className='img' src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1422438190,4092046722&fm=26&gp=0.jpg'></CoverImage>
                        </CoverView>
                    </CoverView>
                </Video>
                
            </View>
        )
    }
}