import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'

import ShowClock from '../../components/ShowTime/ShowTime'
import './index.css'
import childPicture from '../../images/123.jpg'
import namedJson from './named.json'

export default class Index extends Component{
    //构造
    constructor(){

    }

    //生命周期
    componentDidMount(){
        console.log(namedJson)
        console.log(namedJson.x)
    }

    //JSX返回
    render(){
        return (
        <View className='index'>
            <ShowClock></ShowClock>
            <Image src={childPicture}></Image>
        </View>
        )
    }
}