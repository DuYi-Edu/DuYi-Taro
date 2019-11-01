import Taro,{Component} from '@tarojs/taro'

export default class Cloud extends Component{

    componentDidShow(){
        const db = Taro.cloud.database()
        db.collection('shujuku3').get({
            success: function(res) {
              console.log(res.data)
            }
          })
    }

    render(){
        return(
            <View>
                Cloud
            </View>
        )
    }
}