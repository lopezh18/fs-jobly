import React, { Component } from 'react';
import JobDetail from './JobDetail';
import SearchBar from './SearchBar';
import './stylesheets/Jobs.css'

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: null
    }
    this.updateJobs = this.updateJobs.bind(this);
  }

  componentDidMount() {
    if(!this.props.user.loggedIn) {
      this.props.history.push("/login");
    }
  }

  updateJobs(jobs) {
    this.setState({ jobs });
  }

  render() {
    const { jobs } = this.props;

    let displayedJobs = this.state.jobs || jobs;

    let jobsList = displayedJobs.map((job) => (<JobDetail key={job.id} {...job} user={this.props.user}/>));

    if (!displayedJobs.length) {
      jobsList = <p>No jobs found.</p>
    }

    return (
      <div className='Jobs'>
        < SearchBar update={this.updateJobs} type="jobs"/>
        { jobsList }
      </div>
    )
  }
}
