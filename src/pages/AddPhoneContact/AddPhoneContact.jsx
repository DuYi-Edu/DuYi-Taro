import Taro,{Component} from '@tarojs/taro'
import {View,Button,Label,Text,Input} from '@tarojs/components'

export default class AddPhoneContact extends Component{
    constructor(props){
        super(props)
    }

    componentDidShow(){
        Taro.onNetworkStatusChange(res=>{
            console.log(res)
            console.log(res.isConnected)
            console.log(res.networkType)
        })
    }

    state={
        network:'强',
        username:'',
        mobile:'',
        compMobile:'',
        phoneList:[
            {name:'张三',mobile:'13456787890'},
            {name:'李四',mobile:'13456787891'},
            {name:'王五',mobile:''}
        ]
    }

    //添加联系人事件操作
    addContact(){
        Taro.addPhoneContact({
            firstName:this.state.username,
            mobilePhoneNumber:this.state.mobile,
            hostNumber:this.state.compMobile,
            success:(res)=>{
                console.log('success',res)
            }
        })
    }

    //获取用户名
    getUsername(e){
        this.setState({
            username:e.detail.value
        })
    }

    //手机号码
    getMobile(e){
        this.setState({
            mobile:e.detail.value
        })
    }

    //公司手机
    getCompMobile(e){
        this.setState({
            compMobile:e.detail.value
        })
    }

    //当前的网络获取
    getNetwork(){
        Taro.getNetworkType({
            success:res=>{
                let type = res.networkType
                let netWrokDesc = '强'
                if(type === 'wifi'  || type === '4g'){
                    netWrokDesc = '强'
                }else if(type === '3g' || type === '2g' ){
                    netWrokDesc = '弱'
                }else{
                    netWrokDesc = '无'
                }
                this.setState({
                    network:netWrokDesc
                })
            }
        })
    }

    //添加列表中的联系人
    addPhoneContactList(e){
        if(e.mobile == '' || e.name == ''){
            Taro.showToast({
                title:'数据不完整，请填写',
                icon:'none',
                duration:2000
            })
        }

        setTimeout(()=>{
        Taro.addPhoneContact({
            firstName:e.name,
            mobilePhoneNumber:e.mobile,
            success:(res)=>{
                console.log('success',res)
            }
        })},2000)
    }


    render(){
        let phoneListSty={
            height:'60px',
            lineHeight:'60px',
            background:'#ccc',
            paddingLeft:'10px',
            marginBottom:'10px'
        }
        return(
            <View>
                AddPhoneContact
                <View className='section'>
                    <Label>
                        <Text>姓名</Text>
                        <Input name='username' placeholder='新联系人名字' onInput={this.getUsername}></Input>
                    </Label>
                </View>
                <View className='section'>
                    <Label>
                        <Text>手机号码</Text>
                        <Input name='mobile' placeholder='新手机号码' onInput={this.getMobile}></Input>
                    </Label>
                </View>
                <View className='section'>
                    <Label>
                        <Text>公司手机</Text>
                        <Input name='compMobile' placeholder='新手机号码' onInput={this.getCompMobile}></Input>
                    </Label>
                </View>
                <Button onClick={this.addContact.bind(this)}>添加联系人</Button>

                {/* 列表联系人 */}
                {this.state.phoneList.map((item,index)=>(
                    <View taroKey={index} style={phoneListSty} onClick={this.addPhoneContactList.bind(this,item)}>
                        <Text>{item.name}</Text>
                    </View>
                ))}
                 
                 {/* 网络获取 */}
                 <View style='font-size:40px'>
                     网络强度：
                     <Text style='color:red'>{this.state.network}</Text>
                 </View>
                 <Button onClick={this.getNetwork}>网络获取</Button>
            </View>
        )
    }
}