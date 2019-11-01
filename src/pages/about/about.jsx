import Taro,{Component} from "@tarojs/taro"
import {View,Text} from '@tarojs/components'
import './about.css'

export default class About extends Component{
    state = {
        posts:[
            {id:1,title:'Hello world',content:'Welcome to learing'},
            {id:2,title:'Installation',content:'You can install from npm'}
        ]
    }

    handleVal(e){
        console.log(e)
    }

    //render
    render(){
        const {posts}  = this.state
        const sidebar = (
            <View>
                {posts.map((post)=>
                    <Text key={post.id} data-id={post.id} onClick={this.handleVal}>
                        {post.title}
                    </Text>
                )}
            </View>
        )
        const content = posts.map((post)=>{
            return <View key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>
            </View>
        })

        return (
            <View>
                {sidebar}
                <View>----------</View>
                {content}
            </View>
        )
    }
} 