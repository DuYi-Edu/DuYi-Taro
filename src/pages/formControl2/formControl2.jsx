/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
//引入Label
import { View, Text, Label, Radio, RadioGroup,Slider,Textarea,Switch} from '@tarojs/components'

export default class fromControl2 extends Component {
    constructor() {
        super(...arguments)
    }

    state = {
        colorVal:0,
        list: [
            { value: '日本', text: '日本', checked: false },
            { value: '英国', text: '英国', checked: false },
            { value: '法国', text: '法国', checked: false }
        ]
    }

    //单选按钮改变事件
    radioValue(e) {
        console.log(e)
    }


    sliderChange(){

    }

    sliderChanging(e){
        console.log(e)
        this.setState({
            colorVal: e.detail.value
        })
    }

    switchChange(e){
        console.log(e)
    }
    
    render() {
        return (
            <View>
                <Text>Label</Text>
                fromControl2
                {/* Label */}
                <Label className='radio-class' for='1' key='1'>
                    <Radio value='USA'>USA</Radio>
                </Label>
                <Label className='radio-class' for='2' key='2'>
                    <Radio value='CHN'>CHN</Radio>
                </Label>

                {/* Radio单项选择 */}
                {/* RadioGroup 单选择和CheckboxGroup一样 */}
                <RadioGroup name='gender' onChange={this.radioValue}>
                    <Radio value='0' checked>男</Radio>
                    <Radio value='1'>女</Radio>
                </RadioGroup>
                {/* Taro循环单选操作 */}
                <View>
                    <RadioGroup name="myRadio">
                        {this.state.list.map((item, i) => {
                            return (
                                <Label className='radio-class' for={i} key={i}>
                                    <Radio value={item.value}>{item.text}</Radio>
                                </Label>
                            )
                        })}
                    </RadioGroup>
                </View>

                {/* Slider 滑块 */}
                <View style={'background:rgb(211,'+this.state.colorVal+',123);width:100%;height:80rpx'}>Slider</View>
                <Slider step='1' min='50' max='200' value='100' showValue onChange={this.sliderChange} onChanging={this.sliderChanging}></Slider>

                {/* Switch 开关 */}
                <Switch checked type='switch' />
                <Switch checked type='checkbox' onChange={this.switchChange}/>

                {/* TextArea 多行文本框 */}
                {/* 自定义高度是不会出现滚轴的 */}
                <Textarea onInput={this.switchChange} style='background:#fff;width:100%;min-height:80px;padding:0 30rpx' autoHeight value='这是一个Textarea' />
            </View>

        )
    }
}