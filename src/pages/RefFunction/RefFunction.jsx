import Taro, { Component,Events } from '@tarojs/taro'
import { View,Button } from '@tarojs/components'
import Cat from '../../components/Cat/Cat'


// 尽量避免使用Refs
// 不要过度使用
export default class RefFunction extends Component{
    
    constructor(){
        super(...arguments)
        this.cat = Taro.createRef()
        
    }

    
    handleClick(){
        this.cat.current.miao()
    }

    //refCat = (node) => this.cat = node //this.cat 会变成Cat组件实例的引用
    //this.refCat是获取了当前Cat实例对象，并传送给了node，node在赋值给了this.cat
    render(){
        return (
            <View>
                {/* <Cat ref={this.refCat} /> */}
                <Cat ref={this.cat} />
                <Button onClick={this.handleClick.bind(this)}>Button</Button>
            </View>
        )
    }
}