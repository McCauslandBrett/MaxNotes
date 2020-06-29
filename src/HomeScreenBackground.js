//
//  HomeScreenBackground
//  Splashbacktrans3
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, View } from "react-native"


export default class HomeScreenBackground extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.viewView}>
				<Image
					source={require("./../../assets/images/homescreenbackground.png")}
					style={styles.homescreenbackgroundImage}/>
			</View>
	}
}

const styles = StyleSheet.create({
	viewView: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
	},
	homescreenbackgroundImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 812,
	},
})
