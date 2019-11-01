import Taro,{Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'

export default class Greeting extends Component{
    
    render(){
        //props不能改变其值，原因为只读
        //this.props.sayHello = "newValue"
        let saySomething = this.props.sayHello
        //saySomething = "hello world"
        
        return <View>{saySomething}</View>
    }

}
Greeting.propTypes = {
    sayHello: PropTypes.string
  };