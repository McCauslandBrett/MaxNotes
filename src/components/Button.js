import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class B extends Component({props}) {
    render() {
        return (
            <Button>
                <Text> {props.name} </Text>
            </Button>
        )
    }
}
