import Taro,{Component} from '@tarojs/taro'
import {View,Textarea,Button,Image} from '@tarojs/components'

export default class CreateScan extends Component{
    constructor(props){
        super(props)
    }

    state={
        codeText:'',
        imgTempFilePath:''
    }

    //生成二维码
    onGenerate(){
        let that = this
        let onLineScanCodeAPI = `http://qr.topscan.com/api.php?text=${this.state.codeText}`
        Taro.downloadFile({
            url:onLineScanCodeAPI,
            success(res){
                console.log(res)
                that.setState({
                    imgTempFilePath:res.tempFilePath
                })
            }
        })
    }

    //二维码文本输入
    bindInput(e){
        console.log(e.detail.value)
        if(e.detail.value != ''){
            this.setState({
                codeText:e.detail.value
            })
        }else{
            Taro.showToast({
                title:'无内容'
            })
        }
        
    }

    render(){
        return(
            <View>
                CreateScan
                {/* 输入框 */}
                <View>
                    <Textarea placeholder='请输入二维码文本' onInput={this.bindInput.bind(this)} value=''></Textarea>
                </View>
                {/* 显示二维码区域 */}
                <View>
                    <Image style='width:300rpx;height:300rpx' src={this.state.imgTempFilePath}></Image>
                </View>
                {/* 生成二维码 */}
                <View>
                    <Button onClick={this.onGenerate} type='primary'>生成</Button>
                </View>
            </View>
        )
    }

}