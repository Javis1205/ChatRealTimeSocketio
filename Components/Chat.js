import React,{Component} from 'react';
import { Dimensions , View , Text ,TextInput,TouchableOpacity , ScrollView } from 'react-native';
import io from 'socket.io-client';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
let mangChat = [];
export default class Chat extends Component {
    constructor(props){
        super(props);
        this.socket=io('http://192.168.0.103:3000', {jsonp:false});
        let _this = this ;
        this.state={
            mess:'',
            messenger:'',
            user:this.props.username,
        };
        this.socket.on('sv-send-mess-c', function(data){
            let x = mangChat.length;
            mangChat.push(_this.renderMessage(data,x));
            _this.setState({
                messenger:data.m,
            });
        });
    }
    SendMes(){
        this.socket.emit('c-mess-sv',[this.state.user, this.state.mess]);
        this.setState({
            mess:''
        })
    }
    renderMessage(data,x){
        console.log(data,x);
        return (
            <View style={{margin:10}} key={x}>
                <View style={{marginBottom:4,flexDirection:'row'}}>
                    <Text style={{fontSize:17,color:'#2196F3'}}>
                        {data.u} 
                    </Text>
                    <Text style={{fontSize:17,color:'#000',marginLeft:7}}>
                        đã nói :
                    </Text>
                </View>
                <View style={{backgroundColor:'#2196F3',padding:20,borderRadius:10,marginLeft:10}}>
                    <Text style={{fontSize:19,color:'#FFF'}}>
                        {data.m}
                    </Text>
                </View>
            </View>
        );
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:9,paddingTop:54}}>
                    <ScrollView>
                        {mangChat}
                    </ScrollView>
                </View>
                <View style={{flex:1,borderColor:'#2196F3',borderWidth:1,borderTopWidth:3,marginTop:20,flexDirection:'row'}}>
                    
                    <View style={{height:45,width:width*10/12,paddingLeft:10 }} >
                        <TextInput 
                            style={{height:45}}
                            onChangeText={(text)=>{this.setState({mess:text})}}
                            value={this.state.mess}
                        />
                    </View>
                    <TouchableOpacity style={{width:width*2/12 ,borderLeftWidth:3,borderColor:'#2196F3',alignItems:'center',justifyContent:'center'}} 
                                      onPress={()=>{
                                          this.SendMes()
                                      }}
                    >
                        <Icon name="paper-plane-o" size={25} color="#2196F3" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}