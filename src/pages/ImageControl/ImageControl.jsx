/* eslint-disable react/no-unused-state */
import Taro,{Component} from '@tarojs/taro'
import {View,Image} from '@tarojs/components'

export default class ImageControl extends Component{
    constructor(){
        super(...arguments)
    }

    state = {
        demoHeight:'150',
        imgUrls:[
            {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2637078222,383741688&fm=26&gp=0.jpg'},
            {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2637078222,383741688&fm=26&gp=0.jpg'},
            {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2637078222,383741688&fm=26&gp=0.jpg'}
        ],
        flagLoadArr:[false,false,false]
    }

    //被动触发-图片加载错误
    imageOnError(e){
        console.log("图片加载错误",e)
    }

    //图片刚加载完毕时触发
    imageOnLoad(){
        console.log('图片加载完毕')
    }

    //页面正在滚动时的触发
    onPageScroll(e){
        /*
       let str =  e.scrollTop / this.setState.demoHeight
       this.setState({
        flagLoadArr[str]:true
       })
       */
    }

    render(){
        return(
            /**
             * mode:
             *   scaleToFill:缩放模式 不保持横纵比，自动拉伸填满image元素
             *   aspectFit:缩放模式 保持横纵比，使图片的长边完全显示
             *   aspectFill:缩放模式 保持横纵比，使图片的短边完全显示
             *   widthFix：缩放模式，宽度不变，高度自动变化
             *   top:剪裁模式，不缩放图片，只显示图片的顶部区域
             *   bottom:剪裁模式，不缩放图片，只显示图片的地步区域
             *   let,rigth,top left,top right
             * 
             *  Image lazyLoad懒加载，图片先用默认图片填充，直到滚动到此图片位置才加载，
             *      只能用在针对page与scroll-view下的image有效
             */

            <View>ImageControl
                <Image 
                    style = 'width:300px;height:100px background:#fff;' 
                    src = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2637078222,383741688&fm=26&gp=0.jpg' 
                    //src = {this.state.flagLoadArr[index]?this.state.imgUrls[index].url:'../img/default.jpg'}
                    mode = 'top'
                    onError = {this.imageOnError}
                    onLoad = {this.imageOnLoad}
                />
            </View>


        )
    }
}