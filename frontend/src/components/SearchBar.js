import React, { Component } from 'react';
import JoblyApi from '../JoblyApi';
import './stylesheets/SearchBar.css'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({search: evt.target.value })
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let rawResults = await JoblyApi.request(`${this.props.type}?search=${this.state.search}`)
    let cleanResults = rawResults[this.props.type];
    this.props.update(cleanResults);
  }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit} className="searchbar-form">
          <input className='searchbar-input' placeholder="Enter search term.." name="search" value={this.state.search} onChange={this.handleChange}/>
          <button className="btn btn-primary searchbar-submit">Submit</button>
        </form>
      </div>
    )
  }
}
