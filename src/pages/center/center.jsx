import Taro,{Component} from "@tarojs/taro"
import './center.css'

export default class Center extends Component{

    componentWillMount(){
        console.log("center mount params:",this.$router.params)
    }

    render(){
        return <div>abcde</div>
    }
}