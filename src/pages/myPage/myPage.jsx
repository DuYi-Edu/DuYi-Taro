import Taro,{Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import './myPage.css'

import LoginStatus from '../../components/LoginStatus/LoginStatus'

export default class myPage extends Component{
    constructor(){
        this.state={flag:false}
    }
    componentDidMount(){
       
    }
    render(){
        const numbers = [...Array(100).keys()]
        
        return (
            <View>
               <LoginStatus num="1" loadingStatus="no-more" isLoggedIn={this.state.flag}/>
               {
                   numbers.map((number) => {
                    return  <View tarokey={String(number)}>{number+1}</View>
                }) 
               }
            </View> 
        )
    }
}