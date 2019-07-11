import React, { Component } from 'react';
import CompanyDetail from './CompanyDetail';
import SearchBar from './SearchBar';
import './stylesheets/Companies.css'

export default class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: null
    }
    this.updateCompanies = this.updateCompanies.bind(this);
  }
  componentDidMount() {
    if(!this.props.user.loggedIn) {
      this.props.history.push("/login");
    }
  }
  updateCompanies(companies) {
    this.setState({ companies });
  }
  render() {
    const { companies } = this.props;

    let displayedCompanies = this.state.companies || companies;

    let companiesList = displayedCompanies.map((company) => (<CompanyDetail key={company.handle} {...company} />));

    if (!displayedCompanies.length) {
      companiesList = <p>No companies found.</p>
    };

    return (
      <div className='Companies'>
        < SearchBar update={this.updateCompanies} type="companies" />
        {companiesList}
      </div>
    )
  }
}
