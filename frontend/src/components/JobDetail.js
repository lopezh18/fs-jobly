import React, { Component } from 'react';
import "./stylesheets/JobDetail.css";
import JoblyApi from '../JoblyApi';

export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applied: this.props.state || false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick() {
    await JoblyApi.request(`jobs/${this.props.id}/apply`,{username: this.props.user.username }, "post");
    this.setState({applied: true})
  }

  render() {
    console.log(this.props.user.jobs)
    const { title, salary, equity } = this.props;
    let applyBtn;
    if (this.state.applied) { 
      applyBtn = <button disabled={true} className="btn text-white bg-danger" >Applied</button> 
    } else {
      applyBtn = <button className="btn text-white bg-danger" onClick={this.handleClick}>Apply</button>
    }
    
    return (
      <div className="JobDetail">
        <h5>{title}</h5>
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
        {applyBtn}
      </div>
    )
  }
};
