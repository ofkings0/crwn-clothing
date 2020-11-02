import React from 'react';
import { connect } from 'react-redux'; 

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { 
	// auth, 
	// googleProvider, 
	// signInWithGoogle 
} from '../../firebase/firebase.utils';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component{
  constructor(props) {
    super(props);
      
    this.state = {
      email: '',
      password: ''
		};
  };

  handleSubmit = async event => {
	  event.preventDefault();
	  const {emailSignInStart} = this.props;
	  const { email, password } = this.state;
    
		emailSignInStart(email, password);
		// try {
		// 	await auth.signInWithEmailAndPassword(email, password)
		// 	this.setState = {
		// 		email: '',
		// 		password: ''
		// 	};
		// } catch (error) {

		// }
  }

  handleChange = event => {
    const { value, name } = event.target;
      
    this.setState({[name]: value })
  }

	render() {
		const {email, password} = this.state;
		const { googleSignInStart } = this.props;
		return (
			<div className='sign-in'>
				<h2 className='title'>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form  onSubmit={this.handleSubmit} action='' method='get'>
					<FormInput 
						name='email' 
						type='email' 
						value={email} 
						handleChange={this.handleChange}
						label='email'
						required
					/>
					
					<FormInput 
						name='password' 
						type='password' 
						value={password} 
						handleChange={this.handleChange}
						label='password'
						required
					/>

					<div className='buttons'>
						<CustomButton 
							type='submit'
						>
							SIGN IN
						</CustomButton>
						<CustomButton 
							isGoogleSignIn
							type='button'
              				onClick= { googleSignInStart }
						>
							Sign in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
};

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);