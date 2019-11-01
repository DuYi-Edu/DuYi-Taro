import Taro,{Component} from '@tarojs/taro'
import {View,Map,Button} from '@tarojs/components'

export default class MapControl extends Component{
    constructor(){
        super(...arguments)
        //获取地图的对象（上下文）
        this.mapCtx = wx.createMapContext('myMap')
    }

    state={
        latitude:23.099994,
        longitude:113.324520,
        markers:[
            {id:1,latitude:23.099994,longitude:113.324520}
        ],
       
    }

    //获取位置
    getCenterLocation(){
        //获取地图当前显示的中心点的坐标（可拖动地图）
        this.mapCtx.getCenterLocation({
            success:(res)=>{
                console.log(res.longitude,res.latitude)
            }
        })
    }

    //移动位置
    moveToLocation(){
        this.mapCtx.moveToLocation()
    }

    //移动标注
    translateMarker(){
        this.mapCtx.translateMarker({
            markerId:1,
            autoRotate: true,
            duration:1000,
            destination:{
                latitude:23.10229,
                longitude:113.3345211
            },
            animationEnd(){
                //全部动画完成后的操作
                console.log('动画已完成')
            }
        })
    }

    //缩放视野经纬度
    includePoints(){
        this.mapCtx.includePoints({
            points: [{
              latitude:23.10229,
              longitude:113.3345211,
            }, {
              latitude:23.00229,
              longitude:113.3345211,
            }],
            padding: [10]
          })
    }

    render(){
        return(
            <View>
                MapControl
                <Map 
                    id="myMap"
                    style="width:100%;height:300px"
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    markers={this.state.markers}
                    covers={this.state.covers}
     
                />
                <View>
                    <Button onClick={this.getCenterLocation}>获取位置</Button>
                    <Button onClick={this.moveToLocation}>移动位置</Button>
                    <Button onClick={this.translateMarker}>移动标注</Button>
                    {/* <Button onClick={this.includePoints}>缩放视野经纬度</Button> */}
                </View>
            </View>
        )
    }
}