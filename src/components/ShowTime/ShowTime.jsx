import Taro,{Component} from '@tarojs/taro'
import {View,Text,Button} from '@tarojs/components'

class Clock extends Component{
    //构造函数
    constructor(props){
        super(props)
        this.state = {date:new Date(),num:0,name:"hello"}
        this.change = this.change.bind(this)
    }

    //时间的重新设定
    tick(){
        //this.state.date=new Date() 不报错的错误方法
        this.setState({
            date:new Date()
        })
        //更新的异步操作

    }

    //生命周期钩子函数
    componentDidMount(){
        //刚挂载完后的触发
        this.timerID = setInterval(()=>{this.tick()},1000)
    }

    componentWillUnmount(){
        //在卸载前的触发
        clearInterval(this.timerID)
    }

    //改变state值
    change(e){
        //组织事件冒泡
        e.stopPropagation()

        console.log('change before1',this.state.num)
        this.setState({
            num:100
        },()=>{
            console.log('change after1',this.state.name)
        })
        this.setState({
            name:'mary'
        })
    }

    antherChange(){
        console.log('antherChange')
    }

    // Taro和React又一不同点，React的setState不一定总是异步，
    // Taro 合并state

    render(){
        return (
            <View onClick={this.antherChange}>
                <Text>Taro study</Text>
                <Text>现在的时间是：{this.state.date.toLocaleTimeString()}</Text>
                <Button onClick={this.change}>这是state的改变</Button>
            </View>
        )
    }
}