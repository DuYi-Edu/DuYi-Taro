function Welcome2(props){
    let {name} = props
    const sayHi = ()=>{
        console.log(`this is sayHi ${name}`)
    }

    return (
        <View>
            <View>Hello,{name}</View>
            <Button onClick={sayHi}>say Hi</Button>
        </View> 
    )
}