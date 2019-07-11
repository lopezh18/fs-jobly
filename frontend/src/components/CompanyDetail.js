import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./stylesheets/CompanyDetail.css";

export default class CompanyDetail extends Component {

  render() {
    const { handle, description, logo_url, name } = this.props;
    return (
      <div className="CompanyDetail">
        <Link to={`/companies/${handle}`}>
          <h3>{name}</h3>
          <p>{description}</p>
          <img src={logo_url} alt='' />
        </Link>
      </div>
    )
  }
};
