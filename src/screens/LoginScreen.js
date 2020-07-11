import React from "react"
import { Animated, Easing, ImageBackground,
	TouchableOpacity,Dimensions, StyleSheet, 
	View, ScrollView,KeyboardAvoidingView } from "react-native"
import {Input,Text,theme,Button,Block} from 'galio-framework'
const { height, width } = Dimensions.get('screen');
import Amplify, {Auth} from "aws-amplify";
import {updateEmail,login} from "../actions/maxes"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {API,graphqlOperation} from 'aws-amplify'
import {getMaxes} from '../graphql/queries'
 class LoginScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return { header: null, headerLeft: null,headerRight: null,}
	}
	async fetchMaxes(email){
		try{
		  const maxes = await API.graphql(graphqlOperation(getMaxes,{id:email}))
		 // strip wasnt working but should revisit this 
		  const important = { 
			  	email:email, 
				id:maxes.data.getMaxes.id, 
				bench:maxes.data.getMaxes.bench,
				clean:maxes.data.getMaxes.clean, 
				deadlift:maxes.data.getMaxes.deadlift,
				snatch:maxes.data.getMaxes.snatch,
				squat:maxes.data.getMaxes.squat
				} 
		 //  Updates Redux store 
		  this.props.login(important)
		}
		catch(err){
		 // need to add a toast here  
		  console.log('error getting maxes',err)
		}
		
	  }
	constructor(props) {
		super(props)
		
		this.state = {
			password:'',
			email:'',
		
			badinput:false,
			group33ViewScale: new Animated.Value(-1),
			group33ViewOpacity: new Animated.Value(-1),}
		}
	componentDidMount() { this.startAnimationOne()}
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
		})}
	onChangePassword(text){
		this.setState({
			password:text
		})
	}
	signin(){
		const {email,password} = this.state;
		if(email != '' && password != ''){
			this.setState({
				badinput:false
			})
			Auth.signIn(email,password)
			.then(()=> {
			// this.props.updateEmail(email)
			// Pretty sure email is updated anyways

			// syncs redux and DynamoDB
			this.fetchMaxes(email)
			this.props.navigation.navigate("Home")
		})
		.catch(err => console.log('error confirming sign in',err))
	  }
	  else{
		// Set Error State for text inputs
		  this.setState({badinput:true})
		}
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
				
				<Block style ={{alignItems:'center',flex:1,justifyContent: 'flex-end',}}>
				<KeyboardAvoidingView style={{  
                    width: width - theme.SIZES.BASE * 2,
                    marginBottom: 15}} behavior='padding'>
				
				<Input 
					placeholder="email" color={"#000"} 
					autoCapitalize = 'none'
					onChangeText={text => this.onChangeEmail(text.toLowerCase())}
					style={{ borderWidth:0.9,borderColor: this.state.badinput ? theme.COLORS.ERROR : "#000" }} 
					
                />
				<Input 
					onFocus={()=>console.log('focus on password')}
					color={"#000"} 
					style={{ borderWidth:0.9,borderColor: this.state.badinput ? theme.COLORS.ERROR : "#000" }} 
					 onChangeText={text => this.onChangePassword(text)}
                     placeholder="password" password viewPass 
				/>
				</KeyboardAvoidingView>

				
                     <Button onPress={()=>{this.signin()}} round uppercase color={"#000"}>Login</Button>
                     
                     <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Signup')}} style={{paddingVertical: theme.SIZES.BASE}}>
                        <Text h5 bold color={"#000"}>Create Account</Text>
                     </TouchableOpacity>
                </Block>	
			</View>
			</ImageBackground>
		);
	}
}
const mapStateToProps = (state) => {
	return {
	  maxes:state,
	}
	
  }
  
  const mapDispatchToProps =(dispatch) => {
	return bindActionCreators({updateEmail,login},dispatch)
	
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
