import Taro, { Component } from '@tarojs/taro'
import { View, OpenData, Image, Text } from '@tarojs/components'
import './Me.css'

export default class Me extends Component {
    constructor(props) {
        super(props)
    }

    state = {}

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '我的',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6'
    }

    componentDidShow() {

    }

    //菜单：收藏列表点击
    onCollectClick() {
        Taro.navigateTo({
            url:'./Collect'
        })
    }

    //发布历史
    onHistoryClick(){
        Taro.navigateTo({
            url:'./History'
        })
    }

    //菜单：产品意见触发
    onAdvanceClick() {

    }

    render() {
        return (
            <View>
                <View className='amountBg'>
                    {/* 个人区域 */}
                    <View className='img'>
                        {/* 用户的个人头像（小程序的开发能力） */}
                        <OpenData type='userAvatarUrl'></OpenData>
                    </View>
                    <View className='account'>
                        <View className='nick-name'>
                            {/* 简体中文，用户昵称 */}
                            <OpenData type='userNickName' lang='zh_CN'></OpenData>
                        </View>
                        <View className='address'>
                            {/* 所在国家 */}
                            <OpenData type='userCountry'></OpenData>
                            {/* 所在省市 */}
                            <OpenData type='userProvince'></OpenData>
                            {/* 所在城市 */}
                            <OpenData type='userCity'></OpenData>
                        </View>
                    </View>
                </View>
                {/* 菜单列表 */}
                <View className='content'>
                    {/* 收藏列表 */}
                    <View className='line'></View>
                    <View className='item' onClick={this.onCollectClick}>
                        <View className='icon'>
                            <Image src='../../static/images/me/collect.png' className='icon-image' />
                        </View>
                        {/* 菜单文本 */}
                        <View className='itemName'>
                            <View>收藏列表</View>
                        </View>
                        <View class='right'>&gt;</View>
                    </View>
                    {/* 发布历史 */}
                    <View className='hr'></View>
                    <View className='item' onClick={this.onHistoryClick}>
                        <View className='icon'>
                            <Image src='../../static/images/me/history.png' className='icon-image' />
                        </View>
                        <View className='itemName'>
                            <View>发布历史</View>
                        </View>
                        <View className='right'>&gt;</View>
                    </View>
                    {/* 邀请好友 */}
                    <View className='line'></View>
                    <View className='item'>
                        <View className='icon'>
                            <Image src='../../static/images/me/invitation.png' className='icon-image' />
                        </View>
                        <View className='itemName'>
                            <View>邀请好友</View>
                        </View>
                        <View className='right' onClick={this.clickInvitivation}>
                            <Text className='opr'>一起来玩</Text>
                        </View>
                    </View>
                    {/* 产品意见 */}
                    <View className='hr'></View>
                    <View className='item' onClick={this.onAdvanceClick}>
                        <View className='icon'>
                            <Image src='../../static/images/me/advice.png' className='icon-image' />
                        </View>
                        <View className='itemName'>
                            <View>产品意见</View>
                        </View>
                        <View className='right'>&gt;</View>
                    </View>
                    <View className='hr'></View>
                </View>
            </View>
        )
    }
}