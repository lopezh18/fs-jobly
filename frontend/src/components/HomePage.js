import React, { Component } from 'react';
import './stylesheets/HomePage.css'

export default class HomePage extends Component {
  render() {
    let displayHomePage;
    if (this.props.user.loggedIn) {
      displayHomePage = (<h2>Welcome back!</h2>)
    }
    else {
      displayHomePage = (
        <div>
          <button className='login-signup-button' onClick={() => { this.props.history.push("/login") }}>Login/Sign Up</button>
        </div>
      )
    }
    return (
      <div className='HomePage'>
        <h1 className="Jobly">Jobly</h1>
        {displayHomePage}
      </div>
    )
  }
};
