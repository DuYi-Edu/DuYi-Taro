import Taro, { Component } from '@tarojs/taro'
import {View,Form,Input,Textarea,Button} from '@tarojs/components'
import './Advance.css'

const db = Taro.cloud.database()
export default class Advance extends Component {
    constructor(props){
        super(props)
    }

    state = {
        canIUse:Taro.canIUse('button.open-type.getUserInfo')
    }

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '社交圈',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6',
    }

    componentDidShow(){

    }

    //表单提交操作
    formSubmit(e){
        let title = e.detail.value.title
        let description = e.detail.value.description
        

        //判断canIUse
        if(this.state.canIUse){
            //可用
            this.saveDataToServer(title,description)
        }
    
    }

    //反馈问题
    saveDataToServer(_title,_description){
        let that = this
        db.collection('advanceDemo').add({
            data:{
                title:_title,
                content:_description
            }
        }).then(res=>{
            console.log(res)
            Taro.showToast({
                title:'我们已经收到，会及时处理',
                duration:1500
            },)

            setTimeout(()=>{Taro.switchTab({
                url:'./Home'
            })},1500)
            
        }).catch(err=>{console.err(err)})
        
    }

    render(){
        return(
            <View className='content'>
                <Form onSubmit={this.formSubmit}>
                    <View className='input-content'>
                        <Input name='title' placeholder='写个标题' />
                    </View>
                    <View className='text-area'>
                        <Textarea name='description' placeholder='输入详细描述' value=''></Textarea>
                    </View>
                    <View className='btn-func'>
                        <Button className='btn' formType='submit' openType='getUserInfo'>提交意见</Button>
                    </View>
                </Form>
            </View> 
        )
    }
}