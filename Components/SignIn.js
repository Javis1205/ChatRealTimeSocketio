import React,{Component} from 'react';
import { Dimensions , View , Text , Image , TextInput , TouchableOpacity } from 'react-native';
var {width,height} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';
export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.socket=io('https://chatrealtime1205.herokuapp.com/', {jsonp:false});
        let _this = this ;
        this.state = {
            username:'',
        };
        this.socket.on('sv-send-username-c', function(kq){
            if(kq==true){
                Actions.chat({type:'reset',username : _this.state.username}); 
            }else{
                Alert.alert(
                'Thông báo',
                'Tài khoản đã tồn tại !',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
                )
            }
        });
    }
    async SignIn(){
        this.socket.emit('c-gui-sv', this.state.username);
    }
    render(){
        return(
            <View style={{flex:1,alignItems:'center'}}>
                <Image 
                    source={{uri:'https://raw.githubusercontent.com/mattleibow/Socket.IO.Client/master/icons/socketio_256x256.png'}}
                    style = {{height:width/3,width:width/3,marginTop:height/4}}
                />
                <View style={{marginTop:15}}>
                    <Text style={{fontSize:20}}>
                        Tên bạn là gì vậy ?
                    </Text>
                </View>
                <View style={{height:45,borderRadius:10,borderColor:'gray',borderWidth:1,width:width-30,marginTop:20,flexDirection:'row'}}>
                    <View style={{width:(width-30)*2/12 , height:44,borderRightWidth:1,borderColor:'gray',alignItems:'center',justifyContent:'center'}} >
                        <Icon name="pencil" size={25} color="#000" />
                    </View>
                    <View style={{height:45,width:(width-30)*10/12,paddingLeft:10 }} >
                        <TextInput 
                            style={{height:45}}
                            onChangeText={(text)=>{this.setState({username:text})}}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{padding:10,paddingLeft:20,paddingRight:20,backgroundColor:'#3b5998',marginTop:20}}
                                  onPress={()=>{
                                      this.SignIn();
                                  }}
                >
                    <Text style={{fontSize:20,color:'#FFF'}}>
                        Vào phòng chat nào !!!!
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}