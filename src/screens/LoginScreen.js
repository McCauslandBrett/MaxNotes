import React from "react"
import { Animated, Easing, ImageBackground,
	TouchableOpacity,Dimensions, StyleSheet, 
	View, ScrollView,KeyboardAvoidingView } from "react-native"
import {Input,Text,theme,Button,Block} from 'galio-framework'
import Toast from 'react-native-root-toast';
const { height, width } = Dimensions.get('screen');
import Amplify, {Auth} from "aws-amplify";
import {updateEmail,login} from "../actions/maxes"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {API,graphqlOperation} from 'aws-amplify'
import {getMaxes} from '../graphql/queries'
import QModal from "rn-qmodal";
import { MaterialIcons } from '@expo/vector-icons';

// Auth.forgotPassword(username)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// Collect confirmation code and new password, then
// Auth.forgotPasswordSubmit(username, code, new_password)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
 class LoginScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return { header: null, headerLeft: null,headerRight: null,}
	}
	pressForgot(){ this.state.email != '' ? this.ResetPassword():this.setState({bademail:true})}
	pressReset(){
		if(this.state.email != '' && this.state.password != ''&& this.state.confirmationCode != ''){
			//Collect confirmation code and new password, then
			Auth.forgotPasswordSubmit(this.state.email, this.state.confirmationCode, this.state.password)
			.then(data => {
				console.log('reset password successful')
				this.fetchMaxes(this.state.email)
				this.props.navigation.navigate('Home')
			})
    		.catch(err => console.log(err));
		}
	}
	ResetPassword(){
		this.toggleOverlay()
		//send code
		Auth.forgotPassword(this.state.email)
    	.then(data => {console.log('sent code')})
    	.catch(err => {console.log('Error in ResetPassword',err)});
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
			visible:false,
			confirmationCode:'',
			password:'',
			email:'',
			bademail:false,
			badpassword:false,
			group33ViewScale: new Animated.Value(-1),
			group33ViewOpacity: new Animated.Value(-1),}
		}
	onChangeCode(text){ this.setState({ confirmationCode:text})}
	componentDidMount() { this.startAnimationOne()}
	startAnimationOne() {
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
	onChangeEmail(text){this.setState({email:text})}
	onChangePassword(text){this.setState({password:text})}
	toggleOverlay(){this.setState({visible:!this.state.visible})}
	signin(){
		const {email,password} = this.state;
		if(email != '' && password != ''){
			this.setState({bademail:false,badpassword:false})
			Auth.signIn(email,password)
			.then(()=> {
			// syncs redux and DynamoDB
			this.fetchMaxes(email)
			this.props.navigation.navigate('Home')
		})
		.catch(err => console.log('error confirming sign in',err))

	  }
	  else{
		// Set Error State for text inputs
		if(this.state.email == ''){this.setState({bademail:true})}
		if(this.state.password == ''){this.setState({badpassword:true})}
		
		}
	}
	render() {
		return (
			<ImageBackground
			source={require('../../assets/images/Auth/Authback.png')}
			style={styles.image}
			>
				<QModal
				animation={'fade'}
          		card center full backdrop
				visible={this.state.visible}
				toggle={this.toggleOverlay}
         		>	
			    <TouchableOpacity onPress={()=> {this.toggleOverlay()}} style={{position:'absolute',marginTop:5,marginLeft:10}}>
					<MaterialIcons name="close" size={35} color="black" />
				</TouchableOpacity>
		 
				 <Block style={{marginTop:10}}flex space = {'between'}>
					 <Text h4>Check email for a verification code</Text>
					 <Input color={theme.COLORS.INFO} 
					 value={this.state.confirmationCode}
					 style={{ alignItems: 'center',borderColor: "#000" }} 
					 placeholder="confirmation code" viewPass 
					 onChangeText={text => this.onChangeCode(text)}
					/>
					<Input 
					placeholder="email" color={"#000"} 
					autoCapitalize = 'none'
					onChangeText={text => this.onChangeEmail(text.toLowerCase())}
					style={{ borderWidth:0.9,borderColor:"#000" }} 
					value={this.state.email}
                  />
				  	<Input 
					color={"#000"} 
					style={{ borderWidth:0.9,borderColor: this.state.badpassword ? theme.COLORS.ERROR : "#000" }} 
					 onChangeText={text => this.onChangePassword(text)}
                     placeholder="new password" password viewPass 
				/>
					<Button style={{width: 315,height: 40}} onPress={()=>{this.pressReset()}} 
					round uppercase color={"#000"}>Reset</Button>
				 </Block>
		
			 </QModal>

		
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
					style={{ borderWidth:2.0,borderColor: this.state.bademail ? theme.COLORS.ERROR : "grey" }} 
					value={this.state.email}
                />
				<Input 
					color={"#000"} 
					style={{ borderWidth:2.0,borderColor: this.state.badpassword ? theme.COLORS.ERROR : "grey" }} 
					 onChangeText={text => this.onChangePassword(text)}
                     placeholder="password" password viewPass 
				/>
				</KeyboardAvoidingView>

				
                     <Button onPress={()=>{this.signin()}} round uppercase color={"#000"}>Login</Button>
                     <Block row space={'between'}>
					
					 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Signup')}} style={{paddingHorizontal:35,paddingVertical: theme.SIZES.BASE}}>
                        <Text h6 bold color={"#000"}>Create Account</Text>
                     </TouchableOpacity>
					 
					 <TouchableOpacity onPress={()=>{this.pressForgot()}} style={{paddingHorizontal:35,paddingVertical: theme.SIZES.BASE}}>
                        <Text h6 bold color={"#000"}>Forgot Password?</Text>
                     </TouchableOpacity>
					 </Block>
                    
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
