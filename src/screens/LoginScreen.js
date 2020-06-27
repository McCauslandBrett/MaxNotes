import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

class LoginScreen extends Component {
 
    render() {
        return (
            <View>
                <Text> LoginScreen </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user:state.user,
   
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({})
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
