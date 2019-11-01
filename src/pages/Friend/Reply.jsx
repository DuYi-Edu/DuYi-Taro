import Taro,{Component} from '@tarojs/taro'
import {View,Input,Button} from '@tarojs/components'
import './Reply.css'

const db = Taro.cloud.database()
export default class Reply extends Component{
    constructor(props){
        super(props)
    }

    state = {
        id:'',
        openid:'',
        content:''
    }

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '社交圈',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6',
    }

    componentDidShow(){
        //获取用户传送过来的值
        let params = this.$router.params
        this.setState({
            id: params.id,
            openid: params.openid
        })
    }

    //获取用户输入信息
    bindKeyInput(e){
        let that = this
        this.setState({
            content: e.detail.value
        })
    }

    //发布评论
    saveReply(){
        db.collection('replayDemo').add({
            data:{
                content: this.state.content,
                date: new Date(),
                r_id: this.state.id,
                u_id: this.state.openid,
                t_id: this.state.id
            }
        }).then(res=>{
            console.log('replyDemo RES:',res)
            //成功添加后给用户的提示
            Taro.showToast({
                title:'发表成功'
            })
            setTimeout(()=>{
                Taro.navigateTo({
                    url:`./HomeDetail?id=${this.state.id}&openid=${this.state.openid}`
                })
            },1500)
        })
    }

    render(){
        return(
            <View className='content'>
                    <View className='text-content'>
                        <View className='input-content'>
                            <Input onInput={this.bindKeyInput.bind(this)} placeholder='开始你的表演' />
                        </View>
                    </View>
                    <View className='btn-func'>
                        <Button className='btn' onClick={this.saveReply}>发布回复</Button>
                    </View>
            </View>
        )
    }
}