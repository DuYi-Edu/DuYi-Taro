import Taro,{Component} from '@tarojs/taro'
import {View,Text,Image,Button} from '@tarojs/components'
import './Compass.css'

export default class Compass extends Component{
    constructor(){
        super(...arguments)
    }

    

    config={
        navigationBarTitleText: 'Compass操作'
    }

    //跳转
    jump(){
        //Taro跳转API
        Taro.redirectTo({
            url:'../Compass/ShowCompass'
        })
        
    }

    render(){
        return (
            <View className='container'>
                <View className='text'>
                    <Text>请您远离磁场干扰</Text>
                    <Text>并按下图所示校准指南针</Text>
                </View>

                <View className='img'>
                    <Image className='tip-pic' src='../../static/images/tip.jpg'></Image>
                    <Button className='tip-btn' onClick={this.jump.bind(this)}>开始</Button>
                </View>
            </View>
        )
    }
}