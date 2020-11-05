import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
// import { 
//   auth , 
//   createUserProfileDocument
// } from './firebase/firebase.utils';

import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const App = ({ checkUserSession, currentUser }) => {

  // unsubscribeFromAuth = null //used to disconect from auth to prevent memory leaks

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession] ); 

  // componentDidMount() { //when users change, it is changed in user --> user doesn't have to re-signing again
    // checkUserSession();
    // const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   } 
        
    //   setCurrentUser(userAuth)
    // });
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() =>  //if currentUser exists, user cannot access signinsignout page anymore
          currentUser ? (
            <Redirect to='/' />
          ) : (
            <SignInAndSignUpPage/>
          )
        }/>
      </Switch> 
    </div>
  );
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  //setCurrentUser: user => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(App);

