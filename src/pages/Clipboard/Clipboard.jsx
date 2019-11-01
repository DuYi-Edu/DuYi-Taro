import Taro,{Component} from '@tarojs/taro'
import {View,Text,Button} from '@tarojs/components'
import './Clipboard.css'

export default class Clipboard extends Component{
    constructor(){
        super(...arguments)
    }

    state = {
        content:'窗前明月光，疑是地上霜，举头望明月，低头思故乡'
    }

    //加入剪贴板
    copyClipboard(){
        Taro.setClipboardData({
            data: this.state.content,
            success(res){
                Taro.showToast({
                    title:'提示',
                    content:'已经复制',
                    showCancel:false
                })
            }
        })
        /*
       let params={
           data:this.state.content
       }
       Taro.setClipboardData(params).then(()=>{
           Taro.showToast({
               title:'成功复制'
           })
       })
       */
    }

    showClipboard(){
        Taro.getClipboardData({
            success(res){
                console.log(res.data)
            }
        })
        /*
       Taro.getClipboardData().then((res)=>{
           console.log(res.data)
       })
       */
    }

    render(){
        return(
            <View>
                <View>Clipboard</View>
                <View className='container'>
                    <Text>{this.state.content}</Text>
                    <Button onClick={this.copyClipboard.bind(this)}>一键复制</Button>
                    <Button onClick={this.showClipboard.bind(this)}>显示</Button>
                </View>
            </View>
        )
    }
}