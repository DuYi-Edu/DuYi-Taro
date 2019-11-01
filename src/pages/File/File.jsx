import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'
import './File.css'

export default class File extends Component{
    constructor(props){
        super(props)
    }

    state = {

    }

    componentDidShow(){
        
    }

    config = {
        navigationBarTitleText: '文件操作',
    }

    //保存文件
    saveFile(){
        //选择一个图片、并保存到本地
        Taro.chooseImage({
            success(res){
                const tempFilePaths = res.tempFilePaths
                //保存
                Taro.saveFile({
                    tempFilePath:tempFilePaths[0],
                    success(res){
                        //本地所存储的图片路径
                        console.log(res)
                        const savedFilePath = res.savedFilePath
                        console.log('本地存储路径为：',savedFilePath)
                        Taro.showModal({
                            title:'提示',
                            content:'存储完成',
                            showCancel:false
                        })
                        //windows:C:\用户\xxx\AppDat\Local\微信web开发者工具\User Data
                    }
                })
            }
        })
    }

    //获取本地缓存临时文件
    getFileInfo(){
        Taro.chooseImage({
            success(res){
                Taro.getFileInfo({
                    filePath:res.tempFilePaths[0],
                    //size以字节为单位
                    //digst计算算法 md5/sha1 默认使用md5
                    success(res){
                        console.log(res)
                    }
                })
            }
        })
    }

    //获取存储文件列表的事件
    getSavedFiledList(){
        Taro.getSavedFileList({
            success(res){
                console.log(res)
            }
        })
    }

    //清除本地缓存文件
    removeSavedFile(){
        Taro.getSavedFileList({
            success(res){
                console.log(res)
                //删除（单文件名的清除）
                if(res.fileList.length > 0){
                    for(let i=0;i<res.fileList.length;i++){
                        Taro.removeSavedFile({
                            filePath: res.fileList[i].filePath,
                            success(res){
                                console.log('[success]',res)
                            },
                            fail(res){
                                console.log('[fail]',res)
                            },
                            complete(res){
                                console.log('[complete]',res)
                            }

                        })
                    }
                }
            }
        })
    }

    //打开文件
    openDocument(){
        //打开文件需要先下载文件
        Taro.downloadFile({
            url:'https://www.baidu.com/content-search.xml',//docx,xls,ppt,pdf
            success(res){
                const filePath = res.tempFilePath
                Taro.openDocument({
                    filePath: filePath,
                    success(res){
                        console.log('文件已经打开')
                    }
                })
            }
        })
    }

    render(){
        return(
            <View className='container'>
                <View className='page-section'>
                    <View className='control-title'>保存文件</View>
                    <Button type='primary' onClick={this.saveFile.bind(this)}>保存文件</Button>
                </View>
                <View className='page-section'>
                    <View className='control-title'>获取本地缓存临时文件</View>
                    <Button type='primary' onClick={this.getFileInfo.bind(this)}>获取本地缓存临时文件</Button>
                </View>
                <View className='page-section'>
                    <View className='control-title'>获取以存储的文件列表</View>
                    <Button type='primary' onClick={this.getSavedFiledList.bind(this)}>获取以存储的文件列表</Button>
                </View>
                <View  className='page-section'>
                <View className='control-title'>清除本地缓存文件</View>
                    <Button type='primary' onClick={this.removeSavedFile}>清除本地缓存文件</Button>
                </View>
                <View className='page-section'>
                    <View className='control-title'>打开文件</View>
                    <Button type='primary' onClick={this.openDocument}>打开文件</Button>
                </View>
            </View>
        ) 
    }
}