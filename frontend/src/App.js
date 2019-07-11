import React, { Component }from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'
import JoblyApi from './JoblyApi';
import NavBar from './components/NavBar'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobs: [], 
      companies: [],
      user: {loggedIn: false},
    }
    this.updateUser = this.updateUser.bind(this);
    this.makeApiRequest = this.makeApiRequest.bind(this);
  }
  async componentDidMount(){

    if(this.state.user.loggedIn){
      await this.makeApiRequest();
    }
    else if (localStorage.getItem("token")) {
      // Checks if token is valid, then update user.
      let results = await JoblyApi.request(`users/${localStorage.getItem("jobly-username")}`);
      if(results.hasOwnProperty("user")) {
        this.setState({user: {...results["user"], loggedIn: true}})
        await this.makeApiRequest();
      }
    }
  }
  
  async makeApiRequest(){
    const jobs = await JoblyApi.request('jobs')
    const companies = await JoblyApi.request('companies')
  
    this.setState({ jobs: jobs.jobs, companies: companies.companies })
  }

  async updateUser(status, userInfo = {}) {
    this.setState({ user: {...userInfo.user, loggedIn: status} });
    if(status){
      await this.makeApiRequest()
    } else {
      this.setState({
        jobs: [], 
        companies: []
      })
    }
  }

  render(){
    return(
      <BrowserRouter>
      <NavBar user = {this.state.user} updateUser = {this.updateUser} />
       <Routes jobs={this.state.jobs} companies={this.state.companies} user={this.state.user} updateUser={this.updateUser}/>
      </BrowserRouter>
    )
  }
}

export default App;
