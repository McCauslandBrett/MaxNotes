import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
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

 

  render() {
    return (
      <Block flex safearea style={styles.margins}>
        <Block middle style={{marginVertical:30}}>
          <Text h2>MaxList</Text>
        </Block>

        <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text h5 bold>Squat</Text>
        <TextInput
          value = {this.props.maxes.squat}
          onChangeText = {input => this.props.updateSquat(input)}
          placeholder = 'Squat'
          placeholderTextColor= 'gray'
       />
       </Block>
       <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text h5 bold>Deadlift</Text>
        <TextInput
          value = {this.props.maxes.deadlift}
          onChangeText = {input => this.props.updateDeadlift(input)}
          placeholder = 'Squat'
          placeholderTextColor= 'gray'
       />
       </Block>

       <Block row space={'evenly'} style={{marginVertical:20}} >
        <Text h5 bold>Bench</Text>
        <TextInput
          value = {this.props.maxes.bench}
          onChangeText = {input => this.props.updateBench(input)}
          placeholder = 'Bench'
          placeholderTextColor= 'gray'
       />
       </Block>

       <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text h5 bold>Clean</Text>
        <TextInput
          value = {this.props.maxes.clean}
          onChangeText = {input => this.props.updateClean(input)}
          placeholder = 'Clean'
          placeholderTextColor= 'gray'
       />
       </Block>

       <Block row space={'evenly'} style={{marginVertical:20}}>
        <Text h5 bold>Snatch</Text>
        <TextInput
          value = {this.props.maxes.snatch}
          onChangeText = {input => this.props.updateSnatch(input)}
          placeholder = 'Snatch'
          placeholderTextColor= 'gray'
       />
       </Block>
       <Block middle center flex style={styles.bottom}>
          <Button style={{marginVertical:20}} 
                  round uppercase color={"#50C7C7"}>Clear
          </Button>
          <Button style={{marginVertical:20,alignContent:'center'}}
                  round uppercase color={"#50C7C7"}>Save
          </Button>
       </Block>
       
      </Block>
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
