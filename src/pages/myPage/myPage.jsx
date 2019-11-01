import Taro,{Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import './myPage.css'

import LoginStatus from '../../components/LoginStatus/LoginStatus'

export default class myPage extends Component{
    constructor(){
        this.state={flag:false}
    }
    componentDidMount(){}
    render(){
        return (
            <View>
               <LoginStatus num="1" loadingStatus="no-more" isLoggedIn={this.state.flag}/>
            </View>
        )
    }
}    