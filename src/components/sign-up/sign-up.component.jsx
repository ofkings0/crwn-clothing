import React, { useState }from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {

  const [ userDetails, setUserDetails ] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { displayName, email, password, confirmPassword } = userDetails;    
	// constructor() {
	// 	super();

	// 	this.state= {
	// 		displayName: '',
	// 		email: '',
	// 		password: '',
	// 		confirmPassword: ''
	// 	};
	// };

	const handleSubmit = async event => {
    event.preventDefault();

    if(password !== confirmPassword) {
			alert('paswords don\'t match!')
			return;
    }
    
    signUpStart({displayName, email, password});

		// try {
		// 	const { user } = await auth.createUserWithEmailAndPassword(email, password);

		// 	await createUserProfileDocument(user, { displayName })

		// 	this.setState({ //when createUserProfileDocument is successful, clear form
		// 		displayName: '',
		// 		email: '',
		// 		password: '',
		// 		confirmPassword: ''
		// 	})
		// } catch (error) {

		// }
	};

	const handleChange = event => {
		const { value, name } = event.target;
			
		setUserDetails({
      ...userDetails,
			[name]: value,
		})
  };

  return(
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      
      <form className='sign-up-form' onSubmit={ handleSubmit } action='' method='get'>
        <FormInput 
          name='displayName'
          type='text'
          value={displayName}
          handleChange={handleChange}
          label='name'
          required
        />

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

        <FormInput 
          name='confirmPassword'
          type='password' 
          value={confirmPassword} 
          handleChange={handleChange}
          label='confirm password'
          required
        />

        <div className='buttons'>
          <CustomButton 
            type='submit'
          >
            SIGN UP
          </CustomButton>
        </div>
      </form>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userSignUpDetails => dispatch(signUpStart(userSignUpDetails))
})

export default connect(null, mapDispatchToProps)(SignUp);