/* eslint-disable react/no-unused-state */
import Taro,{Component} from '@tarojs/taro'
import {View,Text,Button,Checkbox,CheckboxGroup,Form,Input} from '@tarojs/components'
import './formControl.css'

export default class fromControl extends Component{
    constructor(){
        super(...arguments)
    }
    state = {
        inputValue:'',
        list:[
            {value:'美国',text:'美国',checked:false},
            {value:'中国',text:'中国',checked:false},
            {value:'巴西',text:'巴西',checked:false},
        ],
        btn: [ 
            {
                text: '页面操作 Normal',
                size: 'default',
                type: 'primary'
            },
            {
                text: '页面操作 Loading',
                size: 'default',
                type: 'primary',
                loading: true
            },
            {
                text: '页面操作 Disabled',
                size: 'default',
                type: 'primary',
                disabled: true
            },
            {
                text: '页面操作 Normal',
                size: 'default',
                type: 'default'
            },
            {
                text: '警告操作 Normal',
                size: 'default',
                type: 'warn'
            }
        ]
    }

    //checkbox改变事件
    checkboxChange(e){
        console.log(e)
    }

    //表单提交事件
    formSubmit(e){
        //console.log('用户的输入',this.state.inputValue)
        console.log('用户输入',e.currentTarget.value.username)
    }

    //表单重置事件，reset会自动执行所有表单控件的初始化
    formReset(e){
        console.log(e)
    }

    //动态记录用户的输入操作
    recordUsername(e){
        this.setState({
            inputValue:e.detail.value
        })
    }

    render(){
        let disabled = false
        return(
            <View>
                {/* Button按钮 */}
                <View>Button</View>
                <Button type='default'>默认按钮</Button>
                <Button type='primary'>确认按钮</Button>
                <Button type='warn'>警告按钮</Button>
                <Button type='primary' plain>确认按钮</Button>
                <Button type='primary' disabled={disabled}>确认按钮</Button>
                <Button type='primary' size='mini'>确认按钮</Button>
                <Button className='btn-font'>确认按钮</Button>

                {/* Button 动态列表展示 */}
                {this.state.btn.map((_item,index) =>{
                    return (
                        <Button key={index}
                            size = {_item.size ? _item.size : ''}
                            type = {_item.type ? _item.type : ''}
                            loading = {_item.loading ? _item.loading : false}
                            disabled = {_item.disabled ? _item.disabled : false}
                        >
                            {_item.text}
                        </Button>
                    )
                })}

                {/* Checkbox 复选框 */}
                <CheckboxGroup name='hobby' onChange={this.checkboxChange}>
                <Checkbox value='游泳' checked disabled>游泳</Checkbox>
                <Checkbox onChange={this.checkboxChange} value='踢球'>踢球</Checkbox>
                </CheckboxGroup>
                {/* 数组填充checkbox */}
                {this.state.list.map((item,i)=>{
                    return (
                        <Label for={i} key={i}>
                            <Checkbox value={item.value} checked={item.checked}>
                                {item.text}
                            </Checkbox>
                        </Label>
                    )
                })}

                {/* From表单组件 Input */}
                <Form onSubmit={this.formSubmit} onReset={this.formReset}>
                    <Input name='username' maxLength='10' type='text' placeholder='输入内容' onInput={this.recordUsername} />
                    <Input type='password' password placeholder='输入密码' />
                    <Input type='number' placeholder='这是一个数字输入框' />
                    <Input type='digit' placeholder='带小数点' />
                    <Input type='idcard' placeholder='省份证输入键盘' />
                    <Button formType='submit'>提交按钮</Button>
                    <Button formType='reset'>重置按钮</Button>
                </Form>
            </View>
        )
    }
}