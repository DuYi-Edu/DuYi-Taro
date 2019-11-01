import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './PhotoList.css'

const db = Taro.cloud.database()
const db_imgList = db.collection('imagelist')
export default class PhotoList extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        dataList: [] //所有云存储数据列表
    }

    config = {}

    //生命周期
    componentDidShow() {
        this.getCloudImagList()
    }

    //获取云端数据
    getCloudImagList() {
        let that = this
        //链接云端操作
        //执行（获取云端数据库的数据）
        db_imgList.get().then(res => {
            that.setState({
                dataList: res.data
            })
        })
    }

    //点击相机图片，触发跳转发布
    gotoFabu() {
        //Taro.navigateBack()
        Taro.redirectTo({
            url: '/pages/CloudPhoto/Home'
        })
    }

    //删除
    shanchu(_id,_imgUrl,e){
        let that = this
        let id = _id
        let fileID = _imgUrl
        //询问用户
        Taro.showModal({
            title:'警告',
            content:'确定要删除吗',
            success(res){
                if(res.confirm){
                    //用户确定删除
                    //删除记录
                    db_imgList.doc(id).remove({}).then(res=>{
                        console.log('res',res)
                        //同步删除云存储文件
                        that.deleteCloudFile(fileID)
                        //重新绑定
                        that.getCloudImagList()
                    })
                }
            }
        })
    }

    //根据fileID删除云文件
    deleteCloudFile(fileID){
        Taro.cloud.deleteFile({
            fileList:[fileID]
        }).then(res=>{
            console.log('deleteCloudFile-success:',res)
        }).catch(err=>{
            console.err('deleteCloudFile-fail:',err)
        })
    }

    render() {
        return (
            <View className='container'>
                {/* map循环 */}
                {this.state.dataList.map((item, index) => {
                    return (
                        <View key={index} className='page-section'>
                            <Text className='item-name'>上传人：{item.name}</Text>
                            <Text className='item-time'>上传时间：{item.time}</Text>
                            <Image className='img' src={item.imgUrl}></Image>
                            <Image className='shanchu' onClick={this.shanchu.bind(this,item._id,item.imgUrl)} src='../../static/images/delete.png'></Image>
                        </View>
                    )
                })

                }


                <Image src='../../static/images/fabu.png' onClick={this.gotoFabu} className='fabu'></Image>
            </View>
        )
    }
}