import Taro,{Component}  from '@tarojs/taro'
import {View,Image} from '@tarojs/components'

export default class Cat extends Component{
    /*
    state = {
        imagePath:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2209846807,1303693616&fm=26&gp=0.jpg"
    }

    static defaultProps ={
        mouse:{
            x:0,
            y:0
        }
    }

    render(){
        const {mouse} = this.props
        console.log('mouse',mouse)
        return (
            <View>
            <Image src={this.state.imagePath} style={{position:'absolute',left:mouse.x,top:mouse.y}}></Image>
            </View>
        )
    }
    */

   miao () {
    console.log('miao, miao, miao~')
  }

  render () {
    return <View >123</View>
  }
}