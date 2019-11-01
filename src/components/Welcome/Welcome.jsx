import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'

export default class Welcome extends Component{
    //构造函数
    constructor(){
        super(...arguments)
        this.setState({
            studentName:this.props.name
        })
    }

    state={
        studentName:'alice'
    }

    btnClick(){
        console.log('btnClick')
        //不能在组件内部去改变props的值
        //this.props.name = 'mary'

        //在类组件内部修改值是通过state来完成的
        this.setState({
            studentName: 'mary'
        })
    }

    //返回JSX
    render(){
        return(
            <View>
                Class Welcome component {this.state.studentName}
                <Button type='primary' onClick={this.btnClick}>类组件内事件</Button>
            </View>
        )
    }

}