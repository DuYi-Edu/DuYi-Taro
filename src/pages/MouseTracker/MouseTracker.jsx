import Taro,{Component}  from '@tarojs/taro'
import {View} from '@tarojs/components'
import Mouse from '../../components/Mouse/Mouse'
import Cat from '../../components/Cat/Cat'

export default class MouseTracker extends Component{
    render(){ 
        return(
            <View> 
                <View>MouseTracker</View>
                <Mouse renderCat={mouse =>(
                    <Cat mouse={mouse} />
                )} />
            </View>
        ) 
    }
}