import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button, Text } from '@tarojs/components'
import './Search.css'

const db = Taro.cloud.database({
    env: 'test-jj55w'
})
const channelMenuObj = db.collection('channelMenu')
const _cmd = db.command
export default class Search extends Component {
    state = {
        searchInfo: [],
        key: '',
        programName: ''
    }

    config = {
        navigationBarTitleText: '搜索页面'
    }

    componentDidShow() {

    }

    //获取用户输入的节目名称
    searchProgramName(e) {
        this.setState({
            programName: e.detail.value
        })
    }

    //搜索电视节目
    searchProgram() {
        let that = this
        let searchTmpResult = []
        //云数据获取
        let params = {
            'programList.programName': this.state.programName
        }
        channelMenuObj.where(params).get().then(res => {
            console.log('searchProgram', res)
            //通过数据查找后的结果寻找符合条件的栏目
            for (let i = 0; i < res.data.length; i++) {
                let programList = res.data[i].programList
                //在频道列表中寻找符合条件的搜索结果
                for (let j = 0; j < programList.length; j++) {
                    if (programList[j].programName == this.state.programName) {
                        //最佳频道名称到数组中
                        programList[j].channel = res.data[i].channelName
                        searchTmpResult.push(programList[j])
                    }
                }
            }
            console.log(searchTmpResult)
            //绑定
            that.setState({
                searchInfo: searchTmpResult
            })
        }).catch(console.error())
    }

    render() {
        return (
            <View className='container'>
                <View className='page-section'>
                    <View className='search'>
                        <Input placeholder='节目名称' onInput={this.searchProgramName} />
                        <Button onClick={this.searchProgram}>搜索</Button>
                    </View>
                </View>
                <View className='page-sectoin key'>
                    <Text>搜索关键字:{this.state.key}</Text>
                </View>
                <View className='search-list'>
                    {this.state.searchInfo.map((item, index) => {
                        return (
                            <View key={index} className='search-list-row'>
                                <Text>{item.playTime}</Text>
                                <Text>{item.channel}</Text>
                            </View>
                        )
                    })}


                </View>
            </View>
        )
    }
}