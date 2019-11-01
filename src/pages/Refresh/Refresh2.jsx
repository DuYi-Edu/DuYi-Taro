import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './Refresh2.css'

export default class Refresh2 extends Component {
    constructor(props){
        super(props)
    }

    state = {
        _newsList: ['Taro学习是需要认真对待的', '学习没有捷径刻苦才能成功', 'Taro学习是需要认真对待的', '学习没有捷径刻苦才能成功', 'Taro学习是需要认真对待的', '学习没有捷径刻苦才能成功', 'Taro学习是需要认真对待的', '学习没有捷径刻苦才能成功', 'Taro学习是需要认真对待的', '学习没有捷径刻苦才能成功', 'Taro学习是需要认真对待的', '学习没有捷径刻苦才能成功'],
        _newsData:['新加载的数据'],
        reloadNum:0
    }

    //系统事件，在滚动到页面底部的时候自动触发
    onReachBottom(){
        console.log('滚动到页面底部')
        //判断是否所有数据加载完毕-模拟一个变量可以被加载3次
        if(this.state.reloadNum == 3){
            //已经加载完毕，用户提示
            Taro.showToast({
                title:'已经加载完毕',
                icon:'none'
            })
            //当事件中返回return，即表示终止渲染（不需要在执行如下操作）
            return
        }else{
            let newsData = this.state._newsList
            newsData.push(this.state._newsData[0])
            this.setState({
                reloadNum:this.state.reloadNum + 1,
                _newsList:newsData
            })
        }
        //正式的更新
        console.log('追加数据次数：',this.state.reloadNum)
    }


    render() {
        return (
            <View className='container'>
                <View className='page-section'>
                    {this.state._newsList.map((item, index) => {
                        return (
                            <View taroKey={index} className='news-list-item'>
                                <Text className='news-list-item-title'>{item}</Text>
                                <Text className='flag'>></Text>
                            </View>
                        )
                    })
                    }
                </View> 
            </View>
        )
    }
}