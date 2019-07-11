import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import HomePage from './HomePage'
import Companies from './Companies'
import Company from './Company'
import Jobs from './Jobs'
import Profile from './Profile'

class Routes extends Component {
  render(){
    const { jobs, companies, user, updateUser } = this.props
    return(
      <Switch>
        <Route exact path='/' render={(rtProps)=> <HomePage {...rtProps} user={user}/>}/>
        <Route exact path='/login' render={(rtProps)=> <LoginForm user={user} updateUser={updateUser} {...rtProps}/>}/>
        <Route exact path='/companies' render={(rtProps) => <Companies companies={companies} jobs={jobs} user={user} {...rtProps}/>}/>
        <Route exact path='/companies/:name' render={(rtProps) => <Company companies={companies} jobs={jobs} user={user} {...rtProps}/>}/>
        <Route exact path='/jobs' render={(rtProps) => <Jobs  jobs={jobs} user={user} {...rtProps}/>}/>
        <Route exact path='/profile' render={(rtProps) => <Profile user={user} {...rtProps} updateUser={updateUser}/>}/> 
        <Redirect to='/login'/>
      </Switch>
    )
  }
}

export default Routes