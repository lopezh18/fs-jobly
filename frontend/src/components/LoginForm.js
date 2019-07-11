import React, { Component } from 'react';
import JoblyApi from '../JoblyApi';
import "./stylesheets/LoginForm.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      displayLoginForm: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleLogin(evt) {
    evt.preventDefault();
    let result = await JoblyApi.request("login", this.state, "post");

    localStorage.setItem("token", result.token);
    localStorage.setItem("jobly-username", this.state.username);

    let results = await JoblyApi.request(`users/${localStorage.getItem("jobly-username")}`);
    await this.props.updateUser(true, results);

    this.props.history.push("/");
  }

  async handleSignup(evt) {
    evt.preventDefault()
    let userInfo = {}
    for (let key in this.state) {
      if (this.state[key] && typeof this.state[key] !== 'boolean') {
        userInfo[key] = this.state[key]
      }
    }

    let result = await JoblyApi.request('users', userInfo, "post")
    localStorage.setItem("token", result.token);
    localStorage.setItem("jobly-username", this.state.username)

    let { displayLoginForm, ...userInformation } = this.state;
    await this.props.updateUser(true, { user: { ...userInformation } });
    this.props.history.push("/");
  }

  render() {
    const login = (
      <form onSubmit={this.handleLogin}>
        <input className="LoginForm-input" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
        <br></br>
        <input className="LoginForm-input" name="password" placeholder="password" value={this.state.password} type="password" onChange={this.handleChange} />
        <br></br>
        <button className="btn btn-primary">Submit</button>
      </form>
    )

    const signup = (
      <form onSubmit={this.handleSignup}>
        <input className="LoginForm-input" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
        <br />
        <input className="LoginForm-input" name="password" placeholder="password" value={this.state.password} type="password" onChange={this.handleChange} />
        <br />
        <input className="LoginForm-input" name="first_name" placeholder="first name" value={this.state.first_name} onChange={this.handleChange} />
        <br />
        <input className="LoginForm-input" name="last_name" placeholder="last name" value={this.state.last_name} onChange={this.handleChange} />
        <br />
        <input className="LoginForm-input" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
        <br />
        <button className="btn-primary">Submit</button>

      </form>
    )

    return (
      <div className="LoginForm-container">
        <div className='LoginForm'>
          <div className="LoginForm-button-toggle">
            <button className={`btn btn-primary LoginForm-btn ${this.state.displayLoginForm ? 'active' : 'inactive'}`} onClick={() => this.setState({ displayLoginForm: true })}> Login </button>

            <button className={`btn btn-primary LoginForm-btn ${this.state.displayLoginForm ? 'inactive' : 'active'}`} onClick={() => this.setState({ displayLoginForm: false })}> Sign Up </button>
          </div>
          <div className="LoginForm-form">
            {this.state.displayLoginForm ? login : signup}
          </div>
        </div>
      </div>
    )
  }
}
