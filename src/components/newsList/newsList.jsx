import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './newsList.css'

export default class newsList extends Component {
    render() {
        return (
            <View className='newsList'>
                <Navigator url='#'>
                    <Image className='newsImg' src={this.props.img} />
                    <View>{this.props.title}</View>
                </Navigator>
            </View>
        )
    }
}