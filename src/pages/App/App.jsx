import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'
import Dialog from '../../components/Dialog/Dialog'
import './App.css'

export default class App extends Component{
    render(){
        return (
            <View className='container'>
                <Dialog name='tom' renderHeader={
                    <View className='welcome-message'>Welcome</View>
                }  renderFooter={<Button className='close'>Close</Button>}>
                    <View className='dialog-message'>
                        this is Taro study
                    </View>
                </Dialog>
            </View>
        )
    }
}