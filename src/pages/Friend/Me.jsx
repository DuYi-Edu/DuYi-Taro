import Taro,{Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './Me.css'

export default class Me extends Component{
    constructor(props){
        super(props)
    }

    state = {}

    config = {}

    componentDidShow(){

    }

    render(){
        return(
            <View>
                Me
            </View>
        )
    }
}