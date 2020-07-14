import React, { Component } from 'react'
import { View, StyleSheet, Dimensions,ImageBackground } from 'react-native'
const { height, width } = Dimensions.get('screen');

import { TouchableOpacity, FlatList, 
  FlingGestureHandler, 
  TextInput} from 'react-native-gesture-handler'

import {theme,Text, Block, Button} from 'galio-framework'
//redux
import { connect } from 'react-redux'
import {updateSquat,updateDeadlift,updateBench,
          updateClean,updateSnatch,logout} from "../actions/maxes"
import { bindActionCreators } from 'redux'
import {API,graphqlOperation} from 'aws-amplify'
import {createMaxes,updateMaxes} from '../graphql/mutations'
import { SimpleLineIcons } from '@expo/vector-icons';
// import {getMaxes} from '../graphql/queries'



class HomeScreen extends Component {
   
  
  async saveMaxes(){
    try{
      await API.graphql(graphqlOperation(updateMaxes,{input:this.props.maxes}))
    } catch(err){}
  }
  logout(){
    this.props.logout();
    this.props.navigation.navigate("Login");
  }
  state={visible:false};
  toggleOverlay(){this.setState({visible:!this.state.visible});}

  render() {
    return (
      <ImageBackground
      source={require('../../assets/images/BackHome/homeback2.png')}
      style={styles.image}
      >
        <TouchableOpacity style={{marginTop:15,marginLeft:15}} onPress={()=>{this.logout()}}>
          <SimpleLineIcons name="logout" size={34} color="black" />
        </TouchableOpacity>
        
        
       

        <Block middle style={{marginVertical:0}}>
          <Text style={{fontFamily: "Base02",fontSize: 70}}>Maxes</Text>
        </Block>

        <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text style={{fontFamily: "Base02",fontSize: 30}}>Squat</Text>
        <TextInput
          style={{fontFamily: "Base02",fontSize: 30}}
          value = {this.props.maxes.squat}
          onChangeText = {input => this.props.updateSquat(input)}
          placeholder = '0'
          placeholderTextColor= 'gray'
       />
       </Block>
        <Block row space={'evenly'} style={{marginVertical:20}}>
          <Text style={{fontFamily: "Base02",fontSize: 30}}>Deadlift</Text>
          <TextInput
            value = {this.props.maxes.deadlift}
            onChangeText = {input => this.props.updateDeadlift(input)}
            placeholder = '0'
            placeholderTextColor= 'gray'
            style={{fontFamily: "Base02",fontSize: 30}}
        />
       </Block>
        <Block row space={'evenly'} style={{marginVertical:20}} >
          <Text style={{fontFamily: "Base02",fontSize: 30}}>Bench</Text>
          <TextInput
            value = {this.props.maxes.bench}
            onChangeText = {input => this.props.updateBench(input)}
            placeholder = '0'
            placeholderTextColor= 'gray'
            style={{fontFamily: "Base02",fontSize: 30}}
          />
       </Block>
        <Block row space={'evenly'} style={{marginVertical:20}}>
          <Text style={{fontFamily: "Base02",fontSize: 30}}>Clean</Text>
          <TextInput
            style={{fontFamily: "Base02",fontSize: 30}}
            value = {this.props.maxes.clean}
            onChangeText = {input => this.props.updateClean(input)}
            placeholder = '0'
            placeholderTextColor= 'gray'
          />
       </Block>
        <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text style={{fontFamily: "Base02",fontSize: 30}}>Snatch</Text>
        <TextInput
          style={{fontFamily: "Base02",fontSize: 30}}
          value = {this.props.maxes.snatch}
          onChangeText = {input => this.props.updateSnatch(input)}
          placeholder = '0'
          placeholderTextColor= 'gray'
       />
       </Block>
  
      
      <Block middle center flex style={styles.bottom}>
          <Button onPress= {()=>{this.saveMaxes()}}style={{marginVertical:20,alignContent:'center'}}
                  round uppercase color={"#000"}>Save
          </Button>
       </Block>
      </ImageBackground>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    maxes:state,
  }
  
}
const mapDispatchToProps =(dispatch) => {
  return bindActionCreators({updateSquat,updateDeadlift,updateBench,updateClean,logout,updateSnatch},dispatch)
  
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  margins: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  bottom:{
    justifyContent: 'flex-end',
    alignContent:'center',
    marginBottom: 25
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
