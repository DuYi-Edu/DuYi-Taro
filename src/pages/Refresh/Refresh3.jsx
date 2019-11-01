import Taro, { Component } from '@tarojs/taro'
import { View, Text ,ScrollView,Navigator} from '@tarojs/components'
import './Refresh3.css'

export default class Refresh3 extends Component {
    constructor(props){
        super(props)
    }

    state = {show:'未改动'}

    config = {}

    //生命周期

    //事件函数
    //滚动到顶部触发
    toUpper(){
        console.log('顶部触发')
        this.setState({
            show:'当前顶部触发'
        })
    }

    toLower(){
        console.log('底部触发')
        this.setState({
            show:'当前底部触发'
        })
    }

    render(){
        return (
            <View>
                <View className='scroll-style'>
                    <ScrollView onScrollToLower={this.toLower.bind(this)} onScrollToUpper={this.toUpper.bind(this)} scroll-y className='sv'>
                        <View className='inner'>
                            Taro
                            <View>11</View>
                            <View>22</View>
                            <View>1331</View>
                            <View>44</View>
                        </View>
                    </ScrollView>
                </View>
                <View>{this.state.show}</View>

                {/* 左右滚动触发 */}
                <ScrollView scroll-x className='scroll-x-sty' onScrollToLower={this.toLower.bind(this)} onScrollToUpper={this.toUpper.bind(this)}>
                    <View className='scroll-x-itemlist'>
                        <Navigator url=''>导航1</Navigator>
                        <Navigator url=''>导航2</Navigator>
                        <Navigator url=''>导航3</Navigator>
                        <Navigator url=''>导航4</Navigator>
                        <Navigator url=''>导航1</Navigator>
                        <Navigator url=''>导航2</Navigator>
                        <Navigator url=''>导航3</Navigator>
                        <Navigator url=''>导航4</Navigator>
                        <Navigator url=''>导航2</Navigator>
                        <Navigator url=''>导航3</Navigator>
                        <Navigator url=''>导航4</Navigator>
                    </View>
                </ScrollView>
            </View>
        )
    }
}