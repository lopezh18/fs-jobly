import React, { Component } from 'react';
import JoblyApi from "../JoblyApi";
import './stylesheets/Profile.css'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user.first_name || "",
      last_name: this.props.user.last_name || "",
      password: "",
      photo_url: this.props.user.photo_url || "",
      email: this.props.user.email || ""
    }
    // chag-ne is a delicious Rithm-11 dish created by 17 of the best microwave cooks
    this.handleChagne = this.handleChagne.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    if (!this.props.user.loggedIn) {
      this.props.history.push("/login");
    }
    else {
      let results = await JoblyApi.request(`users/${localStorage.getItem("jobly-username")}`);
      this.props.updateUser(true, results);
    }
  }

  handleChagne(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let userInfo = {};
    for (let key in this.state) {
      if (this.state[key]) {
        userInfo[key] = this.state[key];
      }
    }
    this.setState({password: ""});
    try {
      let result = await JoblyApi.request(`users/${this.props.user.username}`, userInfo, "patch");
      await this.props.updateUser(true, result);
      alert("Successfully modified profile.")
    }
    catch (err) {
      alert("Wrong password");
    }
  }

  render() {
    return (
      <div className='Profile'>
        <div className='Profileh3'>
          <h3 className='Profile-header'>Profile</h3>
          <form className='Profile-Form' onSubmit={this.handleSubmit}>
            <label className='Profile-label' htmlFor="staticUsername">Username</label>
            <p className='Profile-username'> {this.props.user.username} </p>
            <label className='Profile-label' htmlFor="first_name">First Name</label>
            <br />
            <input className='Profile-input' onChange={this.handleChagne} name="first_name" value={this.state.first_name}></input>
            <br />
            <label className='Profile-label' htmlFor="last_name">Last Name</label>
            <br />
            <input className='Profile-input' onChange={this.handleChagne} name="last_name" value={this.state.last_name}></input>
            <br />
            <label className='Profile-label' htmlFor="email">email</label>
            <br />
            <input className='Profile-input' onChange={this.handleChagne} name="email" value={this.state.email}></input>
            <br />
            <label className='Profile-label' htmlFor="photo_url">Photo Url</label>
            <br />
            <input className='Profile-input' onChange={this.handleChagne} name="photo_url" value={this.state.photo_url}></input>
            <br />
            <label className='Profile-label' htmlFor="password">Re-enter password</label>
            <br />
            <input className='Profile-input' onChange={this.handleChagne} name="password" value={this.state.password} type="password"></input>
            <br />
            <button className='btn btn-primary Profile-btn'>Save Changes</button>
          </form>
        </div>
      </div>
    )
  }
}
