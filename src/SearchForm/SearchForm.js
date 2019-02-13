import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeholderText = "E.g. Turku, FI";
    this.state = { cityName: "" };
  }

  handleChange(event) {
    this.setState({ cityName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.cityName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search for a city:
          <input
            type="text"
            value={this.state.cityName}
            placeholder={this.placeholderText}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Go" />
      </form>
    );
  }
}
