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
          updateClean,updateSnatch} from "../actions/maxes"
import { bindActionCreators } from 'redux'


class HomeScreen extends Component {
  state={
        visible:false
      };
      toggleOverlay = () =>{
        this.setState({
          visible:!this.state.visible
        });
      }

  render() {
    return (
      <ImageBackground
      source={require('../../assets/images/BackHome/homeback2.png')}
      style={styles.image}
      >
        
        <Block flex safearea style={styles.margins}>
        <Block middle style={{marginVertical:20}}>
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
          style={{fontFamily: "Base02",fontSize: 30}}
          value = {this.props.maxes.bench}
          onChangeText = {input => this.props.updateBench(input)}
          placeholder = '0'
          placeholderTextColor= 'gray'
       />
       </Block>

       <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text style={{fontFamily: "Base02",fontSize: 30}}>Clean</Text>
        <TextInput
          style={{fontFamily: "Base02",fontSize: 30}}
          value = {this.props.maxes.clean}
          onChangeText = {input => (console.log(this.props.maxes))}
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
       
       
      </Block>
      <Block middle center flex style={styles.bottom}>
          <Button style={{marginVertical:20,alignContent:'center'}}
                  round uppercase color={"#50C7C7"}>Save
          </Button>
       </Block>
      </ImageBackground>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    maxes:state.maxes,
  }
  
}

const mapDispatchToProps =(dispatch) => {
  return bindActionCreators({updateSquat,updateDeadlift,updateBench,updateClean,updateSnatch},dispatch)
  
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
