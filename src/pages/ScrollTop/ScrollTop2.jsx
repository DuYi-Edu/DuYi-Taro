import Taro,{Component} from '@tarojs/taro'
import {View,ScrollView} from '@tarojs/components'
import './ScrollTop2.css'

export default class ScrollTop2 extends Component{
    constructor(props){
        super(props)
    }

    state = {
        topNum:0
    }

     
    scrolltoTop(e){
        console.log(e)
        if(e.detail.scrollTop > 100){
            this.setState({
                cangotop:true
            })
        }else{
            this.setState({
                cangotop:false
            })
        }

        //Taro的数值无变化导致不在重新渲染，这样就会回到顶部无效果，因此在此做数值改变，使其重新渲染
        this.setState({
            topNum:-1
        })
    }

    //滚动到最顶部
    goTop(){
        this.setState({
            topNum:0
        })

    }

    render(){
        return(
 
                <ScrollView scroll-y style='height:1400rpx' scrollTop={this.state.topNum} onScroll={this.scrolltoTop}>
                    <View className='scroll-view1'>top2</View>
                    <View className='scroll-view2'>top3</View>
                    <View className='gotop' hidden={!this.state.cangotop}  onClick={this.goTop}>
                        <View>回到顶部</View>
                    </View>
                </ScrollView>
           
        )
    }
}