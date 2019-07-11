import React, { Component } from 'react';
import JobDetail from './JobDetail';
import './stylesheets/Company.css';
import { withRouter } from 'react-router-dom';

export default class Company extends Component {
  componentDidMount() {
    if(!this.props.user.loggedIn) {
      this.props.history.push("/login");
    }
  }
  render() {
    const { companies, jobs, user } = this.props;
    const handle = this.props.match.params.name;
    const company = companies.filter(c => c.handle === handle)[0];

    let display;

    if (company) {
      let { description, name } = company;
      let companyJobs = jobs.filter(j => j.company_handle === handle);
      display = (
        <div>
          <h1 className='Company-name'>{name}</h1>
          <p className='Company-description'>{description}</p>
          {companyJobs.map(job => <JobDetail className='JobDetail' key={job.id} {...job} user={user} />)}
        </div>);
    }
    else {
      display = <p>Company does not exist.</p>;
    }
    return (
      <div className='Company'>
        {display}
      </div>
    )
  }
};

const goToCompany = withRouter(Company);
