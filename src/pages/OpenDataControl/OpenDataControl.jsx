import Taro,{Component} from '@tarojs/taro'
import {View,WebView,OpenData} from '@tarojs/components'

export default class OpenDataControl extends Component{
    render(){
        return (
            <View>
                <View>
                    我的昵称：
                    <OpenData type='userNickName' lang='zh_CN'></OpenData>
                </View>
                    我的头像
                <View style='width:300rpx;height:200rpx'>
                    <OpenData type='userAvatarUrl' lang='zh_CN'></OpenData>
                </View>
                <View>
                    我的性别：
                    <OpenData type='userGender' lang='zh_CN'></OpenData>
                </View>
                <View>
                    所在城市：
                    <OpenData type='userCity' lang='zh_CN'></OpenData>
                </View>
                <View>
                    所在省份：
                    <OpenData type='userProvince' lang='zh-CN'></OpenData>
                </View>
                <View>
                    所在国家：
                    <OpenData type='userCountry' lang='en'></OpenData>
                </View>
                <View>
                    所用语言：
                    <OpenData type='userLanguage' lang='zh_CN'></OpenData>
                </View>
            </View>
        )
    }
}