import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default class textPage extends Component {
    //定义状态值
    state = {
        contents: [],
        contentsLen: 0
    }

    add = ()=>{
        this.setState(prev => {
           console.log(prev)
           const cot = prev.contents.slice()
           cot.push({text:'hello world'})
           return {
               contents: cot,
               contentsLen: cot.length
           }
        })
    }

    remove = () =>{
        this.setState(prev =>{
            console.log(prev)
            const cot = prev.contents.slice()
            cot.pop()//数组的移除操作
            return {
                contents: cot,
                contentsLen: cot.length
            }
        })
    }

    render() {
        return (
            <View>
                {this.state.contents.map((item,index)=>(
                    <Text key={index}>{item.text}</Text>
                ))
                }
                <Button plain type='default' onClick={this.add}>add Line</Button>
                <Button plain type='default' disabled={this.state.contentsLen? false:true} onClick={this.remove}>remove Line</Button>
            </View>
        )
    }
}