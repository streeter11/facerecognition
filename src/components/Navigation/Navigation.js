import React from 'react';
// import './Navigation.css';


const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{  display: 'flex', justifyContent: 'flex-end' }}>
      <p className='f3 link dim black underline pa3 pointer'
      onClick= {() => onRouteChange("loggedOut")}>Sign Out</p>
    </nav>
    )
  } else {
    return (
      <nav style={{  display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer'
        onClick= {() => onRouteChange("loggedOut")}>Sign In</p>
        <p className='f3 link dim black underline pa3 pointer'
        onClick= {() => onRouteChange("newUser")}>Register</p>
      </nav>
    )
  }
}

export default Navigation;