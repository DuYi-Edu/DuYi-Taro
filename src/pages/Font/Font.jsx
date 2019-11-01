import Taro,{Component} from '@tarojs/taro'
import {View,Text,Button} from '@tarojs/components'
import './Font.css'

export default class Font extends Component{

    state = {
        loaded: false,
        fontFamily: 'Bitstream Vera Serif Bold'
    }

    //加载字体
    loadFontFace(){
        let that = this
        //微信的显示接口，Taro看不见-存在 隐式API
        Taro.loadFontFace({
            family:this.state.fontFamily,
            source:'url("https://sungd.github.io/Pacifico.ttf")',
            success(res){
                console.log(res)
                that.setState({
                    loaded: true
                })
            },
            fail(err){
                console.err(err)
            }
        })
    }

    render(){
        return (
            <View>
                <View className='title'>Font-wx</View>
                <View className='page-section'>
                    <View className={`page-body-info display-area ${this.state.loaded?'font-loaded':''}`}>
                    { !this.state.loaded?
                        (<Text>Load:{this.state.fontFamily}</Text>):
                        (<Text>{this.state.fontFamily} is loaded</Text>)
                    } 
                    </View>
                </View>
                <View class='btn-area'>
                    <Button type='primary' onClick={this.loadFontFace.bind(this)}>加载字体</Button>
                </View>
            </View>
        )
    }
}