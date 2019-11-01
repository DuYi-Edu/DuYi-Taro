import Taro,{Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import Numlist from '../../components/CustomComp/CustomComp' 

export default class listmap extends Component{
    constructor(){
        super(...arguments)
    }

    componentDidMount(){
        /* //javascript中的map操作
        const numbers = [1,2,3,4,5]
        const double = numbers.map((number)=>number * 2)
        console.log(double)
        */
    }

    render(){
        const numbers = [...Array(100).keys()]
        return (<View>
            {
                numbers.map((number)=>{
                    return <Numlist taroKey={number} num={number+1}/>
                })
            }
        </View>)
    }
}