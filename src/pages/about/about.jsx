import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'
import './about.css'
import ShowClock from '../../components/ShowTime/ShowTime'

export default class About extends Component{

    //生命周期
    componentWillMount () {
       
    }
    //render
    render(){
        return <View>
           <ShowClock></ShowClock>
        </View>
    }
}