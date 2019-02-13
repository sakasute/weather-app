import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeholderText = "E.g. Turku, FI";
    this.state = { cityQuery: "" };
  }

  handleChange(event) {
    this.setState({ cityQuery: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { cityQuery } = this.state;
    const { fetchCityWeather } = this.props;
    const cityQueryArr = cityQuery.split(",");

    if (cityQueryArr.length === 2) {
      fetchCityWeather(cityQueryArr[0], cityQueryArr[1]);
    }
    fetchCityWeather(cityQueryArr[0]);
  }

  render() {
    const { cityQuery } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search for a city:
          <input
            type="text"
            value={cityQuery}
            placeholder={this.placeholderText}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Go" />
      </form>
    );
  }
}
