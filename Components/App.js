import React,{Component} from 'react';
import { Dimensions, TouchableOpacity,View,Text } from 'react-native';
import SignIn from './SignIn';
import Chat from './Chat';
import { Router , Scene , Actions } from 'react-native-router-flux';
const BackButton = () =>{
    return(
        <TouchableOpacity onPress={()=>{
                Actions.signin({type:'reset'});
                          }}
                          style={{
                            backgroundColor:'#0D47A1',
                            padding:5,    
                          }}
            >
            <Text style={{fontSize:13,color:'#FFF'}}>
                LOGOUT
            </Text>
        </TouchableOpacity>
    );
}
export default class App extends Component {
    render(){
        return(
            <Router>
                <Scene key='root'>
                    <Scene key='signin' component={SignIn} hideNavBar={true}/>
                    <Scene key='chat'   navigationBarStyle={{backgroundColor:'#2196F3'}} renderLeftButton={BackButton} title='CHAT' titleStyle={{color:'#FFF',fontWeight:'bold'}} component={Chat}  hideNavBar={false}/>
                </Scene>
            </Router>
        );
    }
}