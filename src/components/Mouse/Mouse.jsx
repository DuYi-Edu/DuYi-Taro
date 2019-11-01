import Taro,{Component}  from '@tarojs/taro'
import {View} from '@tarojs/components'


export default class Mouse extends Component{
    constructor(props){
        super(props)

        this.state = {x:0,y:0}
    }

    handleClick(e){
        const { x, y }  = e.detail
        this.setState({
          x,
          y
        });
        console.log(this.state)
    }

    render(){
        return(
            <View style={{height:'100%'}} onClick={this.handleClick}>
                Mouse
                {this.props.renderCat(this.state)}
            </View>
        )
    }
}