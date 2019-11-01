import Taro,{Component} from '@tarojs/taro'
import {View,Button} from '@tarojs/components'
import './CloudDemo.css'

//创建云数据库对象
const db = Taro.cloud.database()
const database = db.collection('shujuku3')

export default class CloudDemo extends Component{

    config = {
        navigationBarTitleText: '云数据库操作'
    }

    state = {
        dataList:[]
    }

    //读取云数据库数据
    getCloudData(){
        let that = this
        //获取云数据库shujuku3的所有记录
        db.collection('shujuku3').get({
            success(res){
                that.setState({
                    dataList: res.data
                })
            }
        })
    }

    //获取单条记录操作
    getCloudDataOne(id,e){
        //获取需要执行命令的记录id
        let dataID = id
        db.collection('shujuku3')
            .doc(dataID)
            .get()
            .then(res=>console.log('res',res))
            .catch(err=>console.err('err',err))
    }

    //录入数据
    addData(){
        db.collection('shujuku3').add({
            data:{
                name:"mary",
                age:'23'
            }
        }).then(res=>{
            console.log(res)
        })
    }

    //更新记录
    updateData(id,e){
        db.collection('shujuku3').doc(id).update({
            data:{
                age:'27'
            }
        }).then(res=>{
            console.log(res)
        })
    }

    //删除数据
    deleteData(id,e){
        database.doc(id).remove({}).then(res=>console.log(res))
    }

    render(){
        return(
            <View>
                <View className='title'>CloudDataDemo</View>
                <Button onClick={this.deleteData.bind(this,'586490d25db676220165c05154f10d33')}>删除记录</Button>
                <Button onClick={this.updateData.bind(this,'586490d25db676220165c05154f10d33')}>更新单条记录</Button>
                <Button onClick={this.addData}>录入数据</Button>
                <Button type='primary' onClick={this.getCloudData}>读取数据</Button>
                <Button type='priamry' onClick={this.getCloudDataOne.bind(this,'adb4b3d7-e00d-4acc-9f19-6453ff495a45')}>获取单条记录</Button>
                {/* 显示数据 */}
                <View>
                     {this.state.dataList.map((item,index)=>{
                         return (
                             <View taroKey={index} onClick={this.getCloudDataOne.bind(this,item._id)}>
                                <View>姓名：{item.name}</View>
                            </View>
                         )
                     })
                        
                     }
                </View>
            </View>
        )
    }
}