import React from "react"
import { Animated, Easing,
        TouchableOpacity, Image, 
        StyleSheet, View,
    Dimensions } from "react-native"
import {Input,Text,theme,Button,Block} from 'galio-framework'
const { height, width } = Dimensions.get('screen');

export default class LoginScreen extends React.Component {

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
		this.state = {
			logoImageRotate: new Animated.Value(-1),
			logoImageOpacity: new Animated.Value(-1),
		}
	}

	componentDidMount() {
        this.startAnimationOne()
	}

	startAnimationOne() {
	
		// Set animation initial values to all animated properties
		this.state.logoImageRotate.setValue(0)
		this.state.logoImageOpacity.setValue(0)
		
		// Configure animation and trigger
		Animated.parallel([Animated.parallel([Animated.timing(this.state.logoImageRotate, {
			duration: 1000,
			easing: Easing.bezier(0, 0, 1, 1),
			toValue: 1,
		}), Animated.timing(this.state.logoImageOpacity, {
			duration: 1000,
			easing: Easing.bezier(0, 0, 1, 1),
			toValue: 1,
		})])]).start()
	}

	render() {
	
		return( <View
				style={styles.viewView}>
				<Animated.View
					style={[{
						opacity: this.state.logoImageOpacity.interpolate({
							inputRange: [-1, 0, 1],
							outputRange: [1, 0, 1],
						}),
						transform: [{
							rotate: this.state.logoImageRotate.interpolate({
								inputRange: [-1, 0, 1],
								outputRange: ["0deg", "-200deg", "0deg"],
							}),
						}],
					}, styles.logoImageAnimated]}>
					<Image
						source={require("./../../assets/images/logo.png")}
						style={styles.logoImage}/>
				</Animated.View>
                <Block middle center flex style={{  
                    flex: 1,
                    width: width - theme.SIZES.BASE * 2,
                    paddingVertical: theme.SIZES.BASE,
                    justifyContent: 'flex-end',
                    marginBottom: 25}}>
                <Input placeholder="username" color={theme.COLORS.INFO} 
                    style={{ borderColor: theme.COLORS.INFO }} 
                    placeholderTextColor={theme.COLORS.INFO}
                    />
                    <Input color={theme.COLORS.INFO} 
                     style={{ borderColor: theme.COLORS.INFO }} 
                     placeholder="password" password viewPass />
                     <Button onPress={()=>{this.props.navigation.navigate("Home")}} round uppercase color={"#50C7C7"}>Login</Button>
                     
                     <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Signup')}} style={{paddingVertical: theme.SIZES.BASE}}>
                        <Text h5 color={"#50C7C7"}>Create Account</Text>
                     </TouchableOpacity>
                </Block>
                
			</View>
        );
	}
}

const styles = StyleSheet.create({
    margins: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
      },
	viewView: {
		backgroundColor: "white",
		flex: 1,
	},
	logoImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	logoImageAnimated: {
		width: null,
		height: 157,
		marginLeft: 39,
		marginRight: 38,
		marginTop: 120,
	},
})
