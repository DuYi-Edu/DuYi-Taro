import Taro,{Component} from '@tarojs/taro'
import {View,Button,Input} from '@tarojs/components'

export default class Index extends Component{


    componentDidShow(){
        //屏幕大小监控
        wx.onWindowResize((res)=>{
            console.log(res)
        })

        //键盘高度监控
        wx.onKeyboardHeightChange(res=>{
            console.log(res)
        })
    }

    //按钮信息
    btnClick(){
       let data = Taro.getMenuButtonBoundingClientRect()
       console.log('按键的宽度',data.width)
       console.log('按键的高度',data.height)
       console.log('按键上边界坐标',data.top)
       console.log('按键右边界坐标',data.right)
       console.log('按键下边界坐标',data.bottom)
       console.log('按键左边界坐标',data.left)
    }
    render(){
        return(
            <View>
                {/* 获取控件的位置信息 */}
                <Button onClick={this.btnClick}>获取按钮的位置信息</Button>
                <Input placeholder='input'></Input>
            </View>
        )
    }
}