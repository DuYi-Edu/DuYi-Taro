import Taro,{Component} from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import './ShowPhoto.css'

export default class ShowPhoto extends Component{
    constructor(props){
        super(props)
    }

    state = {
        photo:''
    }

    //生命周期接受数据
    componentDidShow(){
        let that = this
        //从数据存储中取值
        Taro.getStorage({
            key:'photoPeople',
            success(res){
                console.log('photoPeople:',res)
                //将此值存储到state.src
                that.setState({
                    photo: res.data
                },()=>{
                    //移除存储数据
                    Taro.removeStorage({
                        key:'photoPeople',
                        success(){}
                    })
                })
            }
        })
    }

    render(){
        return(
            <View className='container'>
                <Image className='showImg' src={this.state.photo}></Image>
            </View>
        )
    }
}