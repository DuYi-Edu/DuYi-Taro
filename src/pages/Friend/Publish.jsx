import Taro, { Component } from '@tarojs/taro'
import { View, Form, Button, Textarea, Image, ScrollView, Icon } from '@tarojs/components'
import './Publish.css'


const db = Taro.cloud.database()
const dataInfo = {
    images:[],
    user:{},
    content:'',
    canIUse:Taro.canIUse('button.open-type.getUserInfo'),//canIUse是针对小程序的属性事件判断。所以需要使用小程序的书写规则
    isLike:false
}

export default class Publish extends Component {
    constructor(props) {
        super(props)
        //this.formSubmit = this.formSubmit.bind(this)
    }

    state = {
        constent:'',
        images: [] //用户选择的图片数组集
    }

    config = {
        navigationBarBackgroundColor: '#5495e6',
        navigationBarTitleText: '发布社交圈',
        navigationBarTextStyle: 'white',
        backgroundColor: '#5495e6'
    }

    componentDidShow() {
        this.jugdeUserLogin()
    }

    //用户头像获取权限
    jugdeUserLogin(){
        Taro.getSetting({
            success(res){
                if(res.authSetting['scope.userInfo']){
                    //已经授权，可以直接调用getUserInfo获取头像和昵称
                    Taro.getUserInfo({
                        success(userRes){
                            //console.log(userRes)
                            //存储到dataInfo里面去
                            dataInfo.user = userRes.userInfo
                        }
                    })
                }
            }
        })
    }
    
    //删除
    removeImg(index,e){
        let img = dataInfo.images[index]
        //删除云端图片
        Taro.cloud.deleteFile({
            fileList:[img],
        }).then(res=>{console.log('success')})

        //删除本地图片
        let imgs = this.state.images
        imgs.splice(index,1)//splice会修改原始数据
        this.setState({
            images: imgs
        })
    }

    //表单提交触发
    formSubmit(e) {
        //表单元素中input可以通过name获取值，textarea不行，textarea依然需要通过事件处理方式操作
        //dataInfo.content = e.detail.value['inputConent']
        if(dataInfo.canIUse){
            //判断images的数量
            if(dataInfo.images.length > 0 || dataInfo.content.trim() != ""){
                //保存数据到云端
                this.saveDataToServer()
            }else{
                Taro.showToast({
                    title:'写点东西吧',
                    icon:'none',
                    duration:1000
                })
            }
        }
        
    }

    //保存到服务器（云数据端）
    saveDataToServer(){
        let that = this
        //需要在云端有一个数据集合topicDemo
        let params = {
            data:{
                content: dataInfo.content,
                date: new Date(),
                images: dataInfo.images,
                user: dataInfo.user,
                isLike: dataInfo.isLike
            }
        }
        db.collection('topicDemo').add(params).then(res=>{
            //清空数据
            dataInfo.content = '',
            dataInfo.images = [],
            that.setState({
                content:'',
                images:[]
            })
            //用户提示
            that.showTipAndSwitchTab()
        })
    }

    //用户提示
    showTipAndSwitchTab(){
        Taro.showToast({
            title:'新增记录成功',
            icon:'none',
            duration:1000
        })
    }

    //当前动态获取发布文本内容
    getTextAreaContent(e) {
        //存储到dataInfo
        dataInfo.content = e.detail.value
    }

    //选择图片
    chooseImage() {
        let that = this
        //Taro选择图片
        Taro.chooseImage({
            count: 3, //最多可选的图片数 （系统规定最多9张）
            sourceType: ['album', 'camera'], //图片来源
            sizeType: ['original', 'compressed'], //图片的尺寸
            /* 标注callback
            success:function(res){
                console.log(res)
            },
            fail:function(err){
                console.err(err)
            },
            complete:function(res){
                console.log(res)
            }
            */
            /*箭头模式
            success:(res)=>{
             console.log(res)
            },
            fail:(err)=>{
                 console.log(err)
            },
            complete:(res)=>{
                console.log(res)
            }
            */
            /*省略箭头模式
           success(res){
             console.log(res)
           },
           fail(err){
               console.log(err)
           },
           complete(res){
               console.log(res)
           }
           */
        }).then(res => {
            console.log(res)
            if (res.tempFilePaths.length == 3) {
                Taro.showToast({
                    title: '最多3张图片',
                    icon: 'none',
                    duration: 1000
                })
            }
            //保存到state中
            that.setState({
                images: res.tempFilePaths
            },()=>{
                //数据存储到云端（setState是异步操作）
                that.setImageToCloud()
            })
        }).catch(err => {
            console.error(err)
        })
    }

    //将图片存储到云端
    setImageToCloud(){
        let that = this
        let imagesData = this.state.images
        for(let i in imagesData){
            //将图片上传至云存储空间
            Taro.cloud.uploadFile({
                cloudPath: this.timetostr(new Date()),
                filePath: imagesData[i]
            }).then(res=>{
                dataInfo.images.push(res.fileID)
            })
        }
        console.log('dataInfo',dataInfo)
    }

    //时间日期转换
    timetostr(time){
        let random = Math.floor(Math.random()* (9999-1000))+1000
        let str = random + "_" + time.getMilliseconds() + '.png'
        return str
    }

    render() {
        return (
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
                            {this.state.images.map((item, index) => {
                                return (
                                    <View key={index}>
                                        {/* mode表示图片的缩放模式，aspectFill表示标尺图片的横纵比 */}
                                        <Image mode='aspectFill' src={item}></Image>
                                        <Icon type='clear' color='red' onClick={this.removeImg.bind(this,index)}></Icon>
                                    </View>
                                )
                            })}


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