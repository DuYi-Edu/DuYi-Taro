import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './ad.css'
import Data from '../../static/data.json'

export default class newsList extends Component {
    render() {
        const listItems = Data.adImgs.map((item)=>{
            return <SwiperItem>
                        <Navigator url='#'>
                            <Image src={item.imgPath} />
                        </Navigator>
                    </SwiperItem>
        })

        return (
            <Swiper className='swiper-img'>
                {listItems}
            </Swiper>
        )
    }
}