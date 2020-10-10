import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

//this func takes a component as a parameter, from the component it takes isLoading. 
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps}) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  )
}

export default WithSpinner;