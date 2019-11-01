import Taro,{Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
//import Welcome from '../../components/Welcome/Welcome'
//import Welcome2 from '../../components/Welcome2/Welcome2'
import ShowPage from '../../components/ShowPage/ShowPage'
 
export default class FunctionControl extends Component{
    render(){
        return(
            <View>
               {/* <Welcome name='tom'></Welcome> */}
                {/* <Welcome2 name='tom'></Welcome2> */}
                <ShowPage myHeader='showPage my header' myFooter='showPage my footer'></ShowPage>
            </View>
        )
    }
}