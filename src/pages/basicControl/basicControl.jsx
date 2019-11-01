/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import Taro,{Component} from '@tarojs/taro'
import {View,Icon,Text,Progress,RichText} from '@tarojs/components'

export default class basicControl extends Component{
    constructor(){
        super(...arguments)
    }

    state = {
        downloadProgress:0,
        nodes:[
            {
                name:'div',
                attrs:{
                    class:'div_class',
                    style:'line-height:60px;color:red;'
                },
                children:[{
                    type:'text',
                    text:'Hello world'
                }]
            }
        ]
    }

    search(){
        console.log('search')
    }

    //当前下载进行显示
    download(){
        //生成一个0-100的数值数组
        const numList = [...Array(100).keys()]
        //循环完成数字的加1，并赋值到state里面
        numList.map((_item)=>{
            this.setState({
                downloadProgress: _item+1
            })
        })
    }    

    render(){
        return (
            <View>
                基础内容组件
                <View>Icon</View>
                <Icon type='success' size='60' />
                <Icon type='info' size='40' />
                <Icon type='warn' size='40' />
                <Icon type='warn' size='40' color='#ccc' />
                <Icon type='waiting' size='40' />
                <Icon type='success_no_circle' size='40' />
                <Icon type='download' size='40' color='#000' /> 
                <Icon type='search' size='40' onClick={this.search} />
                <Icon type='clear' color='red' size='20' />

                <View>Text</View>
                <Text selectable={true}>this is Text</Text>
                <View>---</View>
                <Text selectable={false}>this is Text</Text>
                <View>---</View>
                {/* space decode只可以在微信小程序、百度小程序、字节跳动小程序，不能在支付宝小程序使用 */}
                <Text space={true} decode={true}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this is space decode</Text>
                
                {/* Progress除了H5和React Native,其他都支持 */}
                <View>Progress进度条</View>
                <Progress percent={20} showInfo color='#f00' />
                <Progress percent={60} showInfo active />
                <Progress percent={60} showInfo active strokeWidth={2} />
                <Progress percent={this.state.downloadProgress} showInfo  active activeColor='#00f' backgroundColor='#ccc' activeMode='backwards'/>
                <Icon type='download' size='40' color='#000' onClick={this.download} /> 
                {/* activeMode：backwards:动画从头播，forwards:动画从上次结束点接着播 */}

                {/* RichText 富文本*/}
                <View>RichText</View>
                <RichText nodes="hello" />
                <RichText nodes="<h1>hello</h1>" />
                <RichText nodes={this.state.nodes} />
                <div style='color:#00f'>hello</div>
                <div>world</div>
            </View>
        )
    }
}