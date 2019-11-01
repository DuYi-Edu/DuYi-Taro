import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'

export default class Nav4 extends Component{

    goto(){
        
    }

    render(){
        return(
            <View>
                <Button onClick={this.goto.bind(this)}>Nav4跳转</Button>
            </View>
        )
    }
}