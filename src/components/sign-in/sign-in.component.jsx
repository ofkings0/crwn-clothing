import React, { useState } from 'react';
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

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [ userDetails, setUserDetails ] = useState({ email: '', password: '' })
  const { email, password } = userDetails;

  // constructor(props) {
  //   super(props);
      
  //   this.state = {
  //     email: '',
  //     password: ''
	// 	};
  // };

  const handleSubmit = async event => {
    event.preventDefault();
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

  const handleChange = event => {
    const { value, name } = event.target;
      
    setUserDetails({ ...userDetails, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form  onSubmit={handleSubmit} action='' method='get'>
        <FormInput 
          name='email' 
          type='email' 
          value={email} 
          handleChange={handleChange}
          label='email'
          required
        />
        
        <FormInput 
          name='password' 
          type='password' 
          value={password} 
          handleChange={handleChange}
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

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);