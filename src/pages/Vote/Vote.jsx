import Taro, { Component } from '@tarojs/taro'
import { View, Input, Textarea, Image, Text, Picker,Switch,Button} from '@tarojs/components'
import './Vote.css'

export default class Vote extends Component {
    constructor() {
        super(...arguments)
    }

    state = {
        selector: ['单选', '多选'],
        selectorChecked: '单选',
        selectorDate: '2019-01-01',
        time: '12:00'
    }

    config = {
        navigationBarTitleText: '创建投票',
    }

    //投票类型
    onChangeVoteType(e) {
        let typeID = e.detail.value
        this.setState({
            selectorChecked: typeID === '0' ? '单选' : '多选'
        })
    }

    dateChange(e) {
        this.setState({
            selectorDate: e.detail.value
        })
    }

    onTimeChange(e) {
        this.setState({
            time: e.detail.value
        })
    }

    //获取图片操作
    getImage(){
        console.log('获取图片操作')
    }

    render() {
        return (
            <View className='page'>
                <View>Vote Page</View>
                {/* 投票标题 */}
                <View className='section'>
                    <Input type='text' placeholder='请填写标题(2-20个字)' />
                </View>
                {/* 投票说明 */}
                <View className='section'>
                    <Textarea placeholder='请填写投票内容说明(2-80个字)'></Textarea>
                </View>
                {/* 选项 */}
                <View className='section'>
                    <Input className='choose' type='text' placeholder='选项1'></Input>
                    <Input className='choose' type='text' placeholder='选项2'></Input>
                    <View className='choose'>
                        <Image className='img' src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2666341157,2268539627&fm=26&gp=0.jpg'></Image>
                        添加选项
                    </View>
                    <View className='tip'>
                        最多支持15个选项，每个选项不超过40个字
                    </View>
                </View>
                {/* 投票选项（类型，日期，时间，是否匿名） */}
                <View className='section'>
                    <View className='vote-type'>
                        <Text>投票类型: </Text>
                        <View className='select-picker'>
                            <Picker mode='selector' range={this.state.selector} onChange={this.onChangeVoteType}>
                                <View>
                                    {this.state.selectorChecked}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='vote-type'>
                        <Text>结束日期: </Text>
                        <View className='select-picker'>
                            <Picker mode='date' start='2015-09-01' end='2100-09-01' onChange={this.dateChange}>
                                <View>
                                    {this.state.selectorDate}
                                </View>
                            </Picker>
                        </View>
                    </View>

                    <View className='vote-type'>
                        <Text>结束时间: </Text>
                        <View className='select-picker'>
                            <Picker mode='time' start='09:01' end='21:01' onChange={this.onTimeChange}>
                                <View>
                                    {this.state.time}
                                </View>
                            </Picker>
                        </View>
                    </View>

                    <View className='vote-type'>
                        <Text>匿名投票 </Text>
                        <View className='vote-switch'>
                            <Switch />
                        </View>
                    </View>

                    <View className='vote-type'>
                        <Text>开启后，发布者可以看投票人情况</Text>
                    </View>
                </View>

                <View className='section'>
                    <Text>添加图片</Text>
                    <Image className='big-img' onClick={this.getImage} src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1923347319,3260152027&fm=26&gp=0.jpg' />
                </View>
                <View className='tip'>
                        可上传一张和投票主体相关的图片
                </View>
                {/* 确认按钮 */}
                <Button type='primary' className='btn'>确认发布</Button>
            </View>
        )
    }
}