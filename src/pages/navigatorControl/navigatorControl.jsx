import Taro,{Component} from '@tarojs/taro'
import {View,Text,Navigator} from '@tarojs/components'

export default class navigatorControl extends Component{
    render(){
        return (
            <View>navigator
                {/* target：self应用内 miniProgram其他小程序 */}
                {/* open-type:navigate新打开页面 redirect重定向当前页面 switchTab触摸栏打开 reLaunch关闭其他页面，打开当前页面，navigateBack跳转后的返回 */}
                <Navigator target='self' open-type='navigate' url='/pages/home/home'>Taro导航-navigate</Navigator>
                <Navigator target='self' open-type='redirect' url='/pages/home/home'>Taro导航-redirect</Navigator>
                {/* 跳转其他小程序的参数设定 */}
                <Navigator target='miniProgram' app-id='wxc232625ccf1d871c' path='/pages/home/home' extraData={this.state.extarDataInfo}>跳转其他小程序</Navigator>
            </View>
        )
    }
}