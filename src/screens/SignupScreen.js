import React, { Component } from 'react'
import { Animated,View, TouchableOpacity,Easing, 
	ImageBackground, Dimensions, 
	StyleSheet,KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import {Input,Text,theme,Button,Block} from 'galio-framework'
// import {} from "../actions/maxes";
const { height, width } = Dimensions.get('screen');
import Amplify, {Auth} from "aws-amplify";
import { bindActionCreators } from 'redux';
import {API,graphqlOperation} from 'aws-amplify'
import {createMaxes} from '../graphql/mutations'
import QModal from "rn-qmodal";
import {updateEmail} from "../actions/maxes"
import { MaterialIcons } from '@expo/vector-icons';
class SignupScreen extends Component {
	
	
    static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}
	async init () {
		this.props.updateEmail(this.state.email)
		console.log('init maxes:',this.props.maxes)
		try{
		  await API.graphql(graphqlOperation(createMaxes,{input:this.props.maxes}))
		  console.log('added')
		  this.props.navigation.navigate("Home")
		} catch(err){
		  console.log(err)
		}
	  }	

	signup = ()=>{
		if(this.state.email != '' && this.state.password != ''){
			this.setState({
				badinput:false
			})
			Auth.signUp({
				email:this.state.email,
				username:this.state.email,
				password:this.state.password
			}).then(()=> {
				console.log('signup succesful')
				//confirm email modal
				this.toggleOverlay()
			})
			.catch(err => {
				if(err.code=="UsernameExistsException"){ 
					console.log('error sign up',err)
					this.toggleOverlay()
				}
				else{ console.log('error sign up',err)}
			})
		} else{
			this.setState({
				badinput:true
			})
		}
		
	}
	
	confirmSignUp() {
		
		if(this.state.email !='' && this.state.confirmationCode != ''){
			Auth.confirmSignUp(this.state.email,this.state.confirmationCode)
		.then(()=> {
			// if not confirmed yet and good code
			console.log('succesful confirm email')
			this.init()
			
		})
		.catch(err => {
			//if bad code or already confirmed user
			console.log('error confirmation signup',err)
			
		})
		}
	}
	constructor(props) {
		super(props)
		this.toggleOverlay = this.toggleOverlay.bind(this);
		this.state = {
			visible:false,
			badinput:false,
			username:'',
			password:'',
			email:'',
			confirmationCode:'',
			group33ViewScale: new Animated.Value(-1),
			group33ViewOpacity: new Animated.Value(-1),
		}
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
	toggleOverlay(){this.setState({visible:!this.state.visible});}
	componentDidMount() { this.startAnimationOne()}
	onChangeEmail(text){this.setState({email:text})}
	onChangePassword(text){this.setState({password:text})}
	onChangeCode(text){ this.setState({ confirmationCode:text})}
	
	needtosignin () {  
		<Block>
		<TouchableOpacity onPress={()=> {this.toggleOverlay()}} style={{position:'absolute',marginTop:5,marginLeft:10}}>
		<MaterialIcons name="close" size={35} color="black" />
		</TouchableOpacity>
	 

		 <Block style={{marginTop:30}}flex space = {'between'}>
		 <Text h4>Account Already Exist Signin</Text>
		 </Block>
		 </Block>
	}
    render() {
		// const Confirmation=()=>{ 
		// 	return(
		// 	<Block> 
		// 		<TouchableOpacity onPress={()=> {this.toggleOverlay()}} style={{position:'absolute',marginTop:5,marginLeft:10}}>
		// 			<MaterialIcons name="close" size={35} color="black" />
		// 		</TouchableOpacity>
		 
		// 		 <Block style={{marginTop:30}}flex space = {'between'}>
		// 			 <Text h4>Check your email for a verification code</Text>
		// 			 <Input color={theme.COLORS.INFO} 
		// 			 value={this.state.confirmationCode}
		// 			 style={{ alignItems: 'center',borderColor: "#000" }} 
		// 			 placeholder="confirmation code" viewPass 
		// 			 onChangeText={text => this.onChangeCode(text)}
				   
		// 			 />
		// 			<Button style={{width: 315,height: 40}} onPress={()=>{this.confirmSignUp()}} 
		// 			round uppercase color={"#000"}>Confirm Email</Button>
		// 		 </Block>
		//   </Block>
		// );
		// }

	
	
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
		 
				 <Block style={{marginTop:30}}flex space = {'between'}>
					 <Text h4>Check your email for a verification code</Text>
					 <Input color={theme.COLORS.INFO} 
					 value={this.state.confirmationCode}
					 style={{ alignItems: 'center',borderColor: "#000" }} 
					 placeholder="confirmation code" viewPass 
					 onChangeText={text => this.onChangeCode(text)}
				   
					 />
					<Button style={{width: 315,height: 40}} onPress={()=>{this.confirmSignUp()}} 
					round uppercase color={"#000"}>Confirm Email</Button>
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

				<Block style={{ alignItems:'center', flex: 1,justifyContent: 'flex-end',}}>
				<KeyboardAvoidingView style={{  
                    width: width - theme.SIZES.BASE * 2,
                    marginBottom: 15}} behavior='padding'>

					<Input placeholder="email" 
					color={"#000"} 
                    style={{ borderWidth:0.9,borderColor: this.state.badinput ? theme.COLORS.ERROR : "#000" }}
					autoCapitalize = 'none'
					onChangeText={text => this.onChangeEmail(text.toLowerCase())}
      				value={this.state.email}
                    />
					<Input color={theme.COLORS.INFO} 
					 value={this.state.password}
                     style={{ borderWidth:0.9,borderColor: this.state.badinput ? theme.COLORS.ERROR : "#000" }} 
                     placeholder="password" password viewPass 
					 onChangeText={text => this.onChangePassword(text)}
					  />
					</KeyboardAvoidingView>
					<Button onPress={()=>{this.signup()}} round uppercase color={"#000"}>Sign Up</Button>   
					<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}} style={{paddingVertical: theme.SIZES.BASE}}>
                        <Text h5 bold color={"#000"}>Sign-in</Text>
                     </TouchableOpacity>                  
                </Block>
			</View>
			</ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        maxes:state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail},dispatch)
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
