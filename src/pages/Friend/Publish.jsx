import Taro,{Component} from '@tarojs/taro'
import {View,Form,Button,Textarea,Image,ScrollView,Icon} from '@tarojs/components'
import './Publish.css'

export default class Publish extends Component{
    constructor(props){
        super(props)
        //this.formSubmit = this.formSubmit.bind(this)
    }

    state = {}

    config = {}

    componentDidShow(){

    }

    //表单提交触发
    formSubmit(){
        console.log('formSubmit')
    }

    //当前动态获取发布文本内容
    getTextAreaContent(){
        
    }

    //选择图片
    chooseImage(){

    }

    render(){
        return(
            <View>
                <View className='content'>
                    <Form onSubmit={this.formSubmit}>
                        <View className='text-content'>
                            {/* 用户发表言论区 */}
                            <View className='text-area'>
                                <Textarea placeholder='写点内容吧...' value='' name='inputConent' placeholderClass='holder' onBlur={this.getTextAreaContent}>
                                </Textarea>
                            </View>
                        </View>
                        {/* 图片的预览区域 */}
                        <ScrollView className='image-group' scrollX>
                            {/* 循环显示图片 */}
                            <View>
                                {/* mode表示图片的缩放模式，aspectFill表示标尺图片的横纵比 */}
                                <Image mode='aspectFill' src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2725768561,3695072185&fm=26&gp=0.jpg'></Image>
                                <Icon type='clear' onClick={this.removeImg}></Icon>
                            </View>
                        </ScrollView>
                        {/* 按钮区 */}
                        <View class='btn-func'>
                            <Button className='btn-img' onClick={this.chooseImage}>选择图片</Button>
                            <Button className='btn' formType='submit' openType='getUserInfo' >发布社交圈</Button>
                        </View>
                    </Form>
                </View>
            </View>
        )
    }
}