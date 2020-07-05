import React, { Component } from 'react'
import { Animated,View, TouchableOpacity,Easing, ImageBackground, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import {Input,Text,theme,Button,Block} from 'galio-framework'
// import {} from "../actions/maxes";
const { height, width } = Dimensions.get('screen');
import Amplify, {Auth} from "aws-amplify";
import { bindActionCreators } from 'redux';

class SignupScreen extends Component {
    static navigationOptions = ({ navigation }) => {
		state={
			username:'',
			password:'',
			email:'',
			confirmationCode:'',
		}
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}
	signup(){
		Auth.signUp({
			email:this.state.email,
			username:this.state.email,
			password:this.state.password
		})
		.then(()=> {console.log('signed up')})
		.catch(err => console.log('error sign up',err))
	}
	confirmSignUp() {
		Auth.confirmSignUp(this.state.email,this.state.confirmationCode)
		.then(()=> {console.log('succesful confirm sign up')
		this.props.navigation.navigate("Home")
		})
		.catch(err => console.log('error confirmation signup',err))
	}

	constructor(props) {
		super(props)
		this.state = {
			group33ViewScale: new Animated.Value(-1),
			group33ViewOpacity: new Animated.Value(-1),
		}
	}

	componentDidMount() {
		this.startAnimationOne()
	}

	startAnimationOne() {
	
		// Set animation initial values to all animated properties
		this.state.group33ViewScale.setValue(0)
		this.state.group33ViewOpacity.setValue(0)
		
		// Configure animation and trigger
		Animated.parallel([Animated.parallel([Animated.timing(this.state.group33ViewScale, {
			duration: 1000,
			easing: Easing.bezier(0.22, 0.61, 0.36, 1),
			toValue: 1,
		}), Animated.timing(this.state.group33ViewOpacity, {
			duration: 1000,
			easing: Easing.bezier(0.22, 0.61, 0.36, 1),
			toValue: 1,
		})])]).start()
	}
	onChangeEmail(text){
		this.setState({
			email:text
		})
		console.log(this.state.email)
	}
	onChangePassword(text){
		this.setState({
			password:text
		})
		console.log(this.state.password)
	}
	onChangeCode(text){
		this.setState({
			confirmationCode:text
		})
		console.log(this.state.confirmationCode)
	}
    render() {
        return (
            <ImageBackground
			source={require('../../assets/images/Auth/Authback.png')}
			style={styles.image}
			>
				<View style={{flex:1}}>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						justifyContent: "center",
					}}>
					
				</View>
				<Animated.View
					style={[{
						opacity: this.state.group33ViewOpacity.interpolate({
							inputRange: [-1, 0, 0.6, 1],
							outputRange: [1, 0, 1, 1],
						}),
						transform: [{
							scale: this.state.group33ViewScale.interpolate({
								inputRange: [-1, 0, 0.2, 0.4, 0.6, 0.8, 1],
								outputRange: [1, 0.3, 1.1, 0.9, 1.03, 0.97, 1],
							}),
						}],
					}, styles.group33ViewAnimated]}>
					<View style={styles.group33View}>
						<Text style={styles.maxesText}>Maxes</Text>
						<Text style={styles.myText}>MY</Text>
					</View>
				</Animated.View>
				<Block middle center flex style={{  
                    flex: 1,
                    width: width - theme.SIZES.BASE * 2,
                    paddingVertical: theme.SIZES.BASE,
                    justifyContent: 'flex-end',
                    marginBottom: 25}}>

					<Input placeholder="email" 
				
					color={theme.COLORS.INFO} 
                    style={{ borderColor: theme.COLORS.INFO }} 
					placeholderTextColor={theme.COLORS.INFO}
					onChangeText={text => this.onChangeEmail(text)}
      				value={this.state.email}
                    />
					<Input color={theme.COLORS.INFO} 
					 value={this.state.password}
                     style={{ borderColor: theme.COLORS.INFO }} 
                     placeholder="password" password viewPass 
					 onChangeText={text => this.onChangePassword(text)}
      				 
					  />
					 <Button onPress={()=>{this.signup()}} round uppercase color={"#50C7C7"}>Sign Up</Button>

					 <Input color={theme.COLORS.INFO} 
					 value={this.state.confirmationCode}
                     style={{ borderColor: theme.COLORS.INFO }} 
                     placeholder="confirmation code" viewPass 
					 onChangeText={text => this.onChangeCode(text)}
      				 
					  />
					 <Button onPress={()=>{this.confirmSignUp()}} round uppercase color={"#50C7C7"}>Confirm Email</Button>
                     
                </Block>
			</View>
			</ImageBackground>
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
const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	  },
	viewView: {
		flex: 1,
	},
	group33View: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	group33ViewAnimated: {
		position: "absolute",
		width: 326,
		top: 10,
		height: 202,
	},
	maxesText: {
		color: "black",
		fontFamily: "Base02",
		fontSize: 90,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 70,
	},
	myText: {
		color: "black",
		fontFamily: "Base02",
		fontSize: 90,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 0,
	},
})
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
