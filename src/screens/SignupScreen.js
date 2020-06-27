import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
// import {} from "../actions/maxes";
import { bindActionCreators } from 'redux';

class SignupScreen extends Component {
 
    render() {
        return (
            <View>
                <Text> SignupScreen </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user:state.user,
        maxes:state.maxes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({})
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
