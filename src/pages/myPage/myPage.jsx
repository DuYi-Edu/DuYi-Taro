import Taro,{Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import './myPage.css'
import CustomComp from '../../components/CustomComp/CustomComp'

export default class myPage extends Component{
    constructor(){}
    componentDidMount(){}
    render(){
        return (
            <View>
                myPage
                <CustomComp my-class="red-text"/>
            </View>
        )
    }
}