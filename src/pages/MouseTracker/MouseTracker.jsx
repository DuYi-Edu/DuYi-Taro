import Taro,{Component}  from '@tarojs/taro'
import {View,Button} from '@tarojs/components'
import Mouse from '../../components/Mouse/Mouse'
import Cat from '../../components/Cat/Cat'

export default class MouseTracker extends Component{
    roar () {
        // 会打印 `miao, miao, miao~`
        this.cat.miao()
      }
    
      refCat = (node) => this.cat = node // `this.cat` 会变成 `Cat` 组件实例的引用
    
      render () {
        return <View>
        <Button onClick={this.roar.bind(this)}>button</Button>
        <Cat ref={this.refCat} />
        </View>
      }
    /*
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
    */
}