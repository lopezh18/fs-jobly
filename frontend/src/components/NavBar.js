import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './stylesheets/NavBar.css'

export default class NavBar extends Component {
  render() {
    let loggedIn = (
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className='nav-link' exact to='/jobs'> Jobs </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' exact to='/companies'> Companies </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' exact to='/profile'> Profile </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' exact to='/logout' onClick={() => {
              this.props.updateUser(false)
              localStorage.clear()
            }}> Logout </NavLink>
          </li>
        </ul>
      </div>
    )
    if (!this.props.user.loggedIn) {
      loggedIn = (
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className='nav-link' exact to='/login'> Login </NavLink>
            </li>
          </ul>
        </div>
      )
    }

    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <NavLink className='navbar-brand' exact to='/'> Jobly </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          {loggedIn}
      </nav>
    )
  }
}