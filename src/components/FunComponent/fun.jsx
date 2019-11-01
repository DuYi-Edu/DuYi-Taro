import Taro,{Component} from '@tarojs/taro'

export default function Bottom(props){
    let {name} = props
    const sayHi = ()=>{
        console.log(`Hi ${name}`)
    }
    return (
        <View>
            <View>Hello,{name}</View>
            <Button onClick={sayHi}>say Hi</Button>
        </View>
    )

} 