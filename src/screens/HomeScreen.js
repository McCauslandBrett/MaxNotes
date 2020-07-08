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

import {API,graphqlOperation} from 'aws-amplify'
import {createMaxes,updateMaxes} from '../graphql/mutations'
import {getMaxes} from '../graphql/queries'



class HomeScreen extends Component {
   
  async init () {
    const weakguy = {
      email:"tariqu@gmail.com",
      id:"tariqu@gmail.com",
      squat:"200",
      bench:"125",
      snatch:"125",
      clean:"100"
    }
    try{
      await API.graphql(graphqlOperation(createMaxes,{input:weakguy}))
      console.log('added')
    } catch(err){
      console.log('error adding tariqs maxes maybe to weak?')
    }
  }
  async fetchMaxes(){
    try{
      const maxes = await API.graphql(graphqlOperation(getMaxes,{id:"tariqu@gmail.com"}))
      console.log('maxes:',maxes)
    }
    catch{
      console.log('error getting tariqs maxes maybe to weak?')
    }
    
  }
  async saveMaxes(){
   
    try{
      console.log("save:",this.props.maxes)
      await API.graphql(graphqlOperation(updateMaxes,{input:this.props.maxes}))
      console.log('updated')
    } catch(err){
      console.log('error updateing tariqs maxes')
    }
  }
  componentDidMount(){
    console.log('Home email:',this.props.maxes.email)
    console.log('Home ID:',this.props.maxes.id)
    // this.init()
    // this.fetchMaxes()
    // this.changeMaxes()

   }
  state={
        visible:false
      };
      toggleOverlay(){
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
          value = {this.props.squat}
          onChangeText = {input => this.props.updateSquat(input)}
          placeholder = '0'
          placeholderTextColor= 'gray'
       />
       </Block>
       <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text style={{fontFamily: "Base02",fontSize: 30}}>Deadlift</Text>
        <TextInput
          value = {this.props.deadlift}
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
          value = {this.props.bench}
          onChangeText = {input => this.props.updateBench(input)}
          placeholder = '0'
          placeholderTextColor= 'gray'
       />
       </Block>

       <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text style={{fontFamily: "Base02",fontSize: 30}}>Clean</Text>
        <TextInput
          style={{fontFamily: "Base02",fontSize: 30}}
          value = {this.props.clean}
          onChangeText = {input => (console.log(this.props.maxes))}
          placeholder = '0'
          placeholderTextColor= 'gray'
       />
       </Block>

       <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text style={{fontFamily: "Base02",fontSize: 30}}>Snatch</Text>
        <TextInput
          style={{fontFamily: "Base02",fontSize: 30}}
          value = {this.props.snatch}
          onChangeText = {input => this.props.updateSnatch(input)}
          placeholder = '0'
          placeholderTextColor= 'gray'
       />

       </Block>
       
       
      </Block>
      <Block middle center flex style={styles.bottom}>
          <Button onPress= {()=>{this.saveMaxes()}}style={{marginVertical:20,alignContent:'center'}}
                  round uppercase color={"#50C7C7"}>Save
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
