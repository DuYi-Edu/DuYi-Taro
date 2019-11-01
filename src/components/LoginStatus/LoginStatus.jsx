import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class LoginStatus extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        //接受用户的属性传值
        const isLogginedIn = this.props.isLoggedIn
        let showContent = null
        let loadingText = '正在加载'
        let loadingStatus = this.props.loadingStatus
        let gift1 = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2974829433,756068348&fm=26&gp=0.jpg"
        let gift2 = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2974829433,756068348&fm=26&gp=0.jpg"
        let gift3 = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2974829433,756068348&fm=26&gp=0.jpg"
        //判断是否已经登录
        if (isLogginedIn) {
            showContent = <View><Text>欢迎您的光临</Text></View>
        } else {
            showContent = <View><Text>请先登录</Text><Button>登录</Button></View>
        }
        // && 惰性原理      false && true

        return (
            <View>
                {showContent}
                {/* 逻辑运算符操作 */}
                {isLogginedIn && <View><Text>欢迎您的光临</Text></View>}
                {!isLogginedIn && <View><Text>请先登录</Text><Button>登录</Button></View>}
                {/* 三元运算符 ？： */}
                {isLogginedIn
                    ? <View><Text>欢迎您的光临</Text></View>
                    : <View><Text>请先登录</Text><Button>登录</Button></View>
                }
                {/* 枚举 */}
                {
                    {
                        'loading': loadingText,
                        "fail": <View>加载失败，点击重试</View>,
                        'no-more': '没有更多了'
                    }[loadingStatus]
                }
                {/* switch Taro 编译通过，但在小程序无法运用wxml
                无此无法*/}
                {(
                    () => {
                        switch (this.props.num) {
                            case "1": { "aa" } break;
                            case "2": { "bb" } break;
                            case "3": { "cc" } break;
                        }
                    }
                )}
            </View>
        )
    }
}