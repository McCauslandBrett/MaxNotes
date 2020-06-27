import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { TouchableOpacity, FlatList, FlingGestureHandler } from 'react-native-gesture-handler'
import {} from "../actions/maxes"
import { bindActionCreators } from 'redux'
import ImageDetail from '../components/ImageDetail'

class HomeScreen extends Component {

 

  render() {
    return (
      <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
       <Text>Hello</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    maxes:state.maxes,
  }
  
}

const mapDispatchToProps =(dispatch) => {
  return bindActionCreators({},dispatch)
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
