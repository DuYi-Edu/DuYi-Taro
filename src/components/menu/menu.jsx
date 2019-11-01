import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './menu.css'


export default class newsList extends Component {
    render() {
        return ( <View className='bg'>
        <ScrollView scroll-x>
            <View className='menu'>
                <Navigator url='#'>社会新闻</Navigator>
                <Navigator url='#'>国际新闻</Navigator>
                <Navigator url='#'>国内新闻</Navigator>
                <Navigator url='#'>娱乐新闻</Navigator>
                <Navigator url='#'>国内新闻</Navigator>
                <Navigator url='#'>体育新闻</Navigator>
                <Navigator url='#'>八卦新闻</Navigator>
                <Navigator url='#'>关注新闻</Navigator>
            </View>
        </ScrollView>
     </View>)
    }
}