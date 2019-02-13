import React, { Component } from "react";
import "./App.css";
import "./SearchForm/SearchForm";
import CityNotFoundPage from "./CityNotFoundPage/CityNotFoundPage";
import CityPage from "./CityPage/CityPage";
import InitialPage from "./InitialPage/InitialPage";
import SearchForm from "./SearchForm/SearchForm";

import update from "immutability-helper";

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchCityWeather = this.fetchCityWeather.bind(this);
    this.parseWeatherData = this.parseWeatherData.bind(this);
    this.state = {
      // NOTE: I do realize that this doesn't protect the Api key from being viewed
      // client-side but at least it isn't stored in the public repository.
      owmApiKey: process.env.REACT_APP_OWM_API_KEY,
      units: "metric", // 'imperial' or 'metric'
      weatherData: {},
      selectedCityId: "" // cityId from OWM or boolean false, if city not found
    };
  }

  /* 
  Returns the OpenWeatherMap json-object for the city or boolean false if no
  such city was found.
  
  params: name of the city and optionally the two letter country code.
  */
  fetchCityWeather(cityName, countryCode = "") {
    const { owmApiKey, units } = this.state;
    const baseApiUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${owmApiKey}&units=${units}`;
    const cityQuery =
      countryCode.length === 2 ? cityName + countryCode : cityName;

    fetch(baseApiUrl + `&q=${cityQuery}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.parseWeatherData(json);
      });
  }

  /* 
  Checks if a city was found and sets weatherData and selectedCityId inside state
  accordingly.

  params: the json response from the OpenWeatherMap API
  */
  parseWeatherData(owmData) {
    if (owmData.cod === "404") {
      this.setState({ selectedCityId: false });
    } else {
      const cityId = owmData.sys.id;
      this.setState(prevState =>
        update(prevState, {
          weatherData: { [cityId]: { $set: owmData } },
          selectedCityId: { $set: cityId }
        })
      );
    }
  }

  render() {
    const { weatherData, selectedCityId } = this.state;
    let mainContent;

    switch (selectedCityId) {
      case false:
        mainContent = <CityNotFoundPage />;
        break;
      case "":
        mainContent = <InitialPage />;
        break;
      default:
        mainContent = <CityPage data={weatherData[selectedCityId]} />;
    }

    return (
      <div className="App">
        <SearchForm fetchCityWeather={this.fetchCityWeather} />
        {mainContent}
      </div>
    );
  }
}

export default App;
