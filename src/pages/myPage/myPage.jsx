import Taro,{Component} from '@tarojs/taro'
import {View,Text,ScrollView,Navigator} from '@tarojs/components'
import './myPage.css'
import NewsList from '../../components/newsList/newsList'
import AdList from '../../components/ad/ad'
import MenuList from '../../components/menu/menu'
import Data from '../../static/data.json'

export default class myPage extends Component{
    render(){
        const listItems = Data.items.map((item)=>{
            return <NewsList img={item.img} title={item.title}/>
        })

        return (
            <View>
              {/* 新闻菜单 */}
                  <MenuList/>
              {/* 轮播图 */}
                  <AdList/>
              {/* 图片新闻 */}
              <View>
                {listItems}
              </View>
            </View> 
        )
    }
}