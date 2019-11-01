import Taro,{Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './Dialog.css'

export default class Dialog extends Component{
    render(){
        return (
            <View className='dialog'>
                <View className='header'>
                    {this.props.renderHeader} {this.props.name}
                </View>
                <View className='body'>
                    {this.props.children}
                </View>
                <View className='footer'>
                    {this.props.renderFooter}
                </View>
            </View>
        )
    }
}