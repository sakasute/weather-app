import React, { Component } from "react";
import "./SearchForm.css";

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
      fetchCityWeather(cityQueryArr[0].trim(), cityQueryArr[1].trim());
    }
    fetchCityWeather(cityQueryArr[0].trim());
  }

  render() {
    const { cityQuery } = this.state;

    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <label className="card__title search__label">
          Search for a city:
          <input
            className="search__text-field"
            type="text"
            value={cityQuery}
            placeholder={this.placeholderText}
            onChange={this.handleChange}
          />
        </label>
        <input className="search__btn" type="submit" value="GO!" />
      </form>
    );
  }
}
