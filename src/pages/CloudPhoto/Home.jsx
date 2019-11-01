import Taro,{Component} from '@tarojs/taro'
import {View,Button,Image} from '@tarojs/components'
import './Home.css'

const db = Taro.cloud.database()
const db_imgList = db.collection('imagelist')
export default class Home extends Component{
    constructor(props){
        super(props)
    }

    state = {
        imgUrl:'',
        showImg: true //预览图片的隐藏
    }

    config = {
        navigationBarTitleText: '云图库'
    }

    componentDidShow(){

    }

    //上传图片
    upload(){
        let that = this
        //选择图片
        Taro.chooseImage({
            count:1,
            success(res){
                //loading
                Taro.showLoading({
                    title:'上传中...',
                })
                //云存储
                let imgName = Math.random(1000)*100 + '.png'
                let params={
                    cloudPath: imgName,
                    filePath: res.tempFilePaths[0]
                }
                Taro.cloud.uploadFile(params).then(res=>{
                    //隐藏loading
                    Taro.hideLoading()
                    //将结果存储到state中
                    that.setState({
                        imgUrl:res.fileID,
                        showImg: false //显示预览图片
                    },()=>{
                        //录制云数据库
                        that.addImgList(that.state.imgUrl)
                    })
                    
                }).catch(console.error())
            }
        })
    }

    //添加数据至云数据库
    addImgList(imgUrl){
        let db_add_data = {
            name:'JC',
            imgUrl: imgUrl,
            time: this.getNowFormatData()
        }
        //添加图片到云数据库
        db_imgList.add({
            data: db_add_data
        }).then(res=>{
            console.log('success',res)
            Taro.showToast({
                title:"上传成功",
                duration:1000
            })
             //跳转，延迟1000
             setTimeout(()=>{
                Taro.navigateTo({
                    url:'/pages/CloudPhoto/PhotoList'
                })
            },2000)
        })
    }

    //格式化日期时间
    getNowFormatData(){
        let date = new Date()
        let seperator1 = '-'
        let seperator2 = ':'
        let month = date.getMonth()+1
        let strDate = date.getDate()
        if(month >1 && month <=9){
            month = '0' + month
        }
        if(strDate >=0 && strDate <=9){
            strDate = '0' + strDate
        }
        //拼接
        let currentDate = date.getFullYear() + seperator1 + month + seperator2 + strDate + " " + date.getHours() + seperator2 +  date.getMinutes() + seperator2 + date.getSeconds()
        return currentDate
    }

    render(){
        return(
            <View className='container'>
                <View className='page-section'>
                    <Button onClick={this.upload} type='primary'>上传图片</Button>
                    <Image src={this.state.imgUrl} hidden={this.state.showImg} />
                </View>
            </View>
        )
    }
}