import React, { Component } from "react";
import "./App.css";
import "./SearchForm/SearchForm";
import CityNotFoundPage from "./CityNotFoundPage/CityNotFoundPage";
import CityPage from "./CityPage/CityPage";
import FavouritesList from "./FavouritesList/FavouritesList";
import InitialPage from "./InitialPage/InitialPage";
import SearchForm from "./SearchForm/SearchForm";

import update from "immutability-helper";

class App extends Component {
  /* 
  Helper function to check if id-number is found in given object's keys
  */
  static checkIfIdIsKey(obj, id) {
    return Object.keys(obj).includes(id.toString());
  }

  constructor(props) {
    super(props);
    this.fetchCityWeather = this.fetchCityWeather.bind(this);
    this.parseWeatherData = this.parseWeatherData.bind(this);
    this.selectCity = this.selectCity.bind(this);

    this.addFavourite = this.addFavourite.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
    this.toggleFavourite = this.toggleFavourite.bind(this);

    this.state = {
      // NOTE: I do realize that this doesn't protect the Api key from being viewed
      // client-side but at least it isn't stored in the public repository.
      owmApiKey: process.env.REACT_APP_OWM_API_KEY,
      units: "metric", // 'imperial' or 'metric'
      weatherData: {},
      selectedCityId: "", // cityId from OWM or boolean false, if city not found
      favourites: {}
    };
  }

  // Get the favourites from localStorage
  componentDidMount() {
    const favouritesStr = localStorage.getItem("favourites");
    if (favouritesStr !== null) {
      const favourites = JSON.parse(favouritesStr);
      this.setState({ favourites });
    }
  }

  /* 
  Returns the OpenWeatherMap json-object for the city or boolean false if no
  such city was found.
  
  params: name of the city and optionally the two letter country code.
  */
  fetchCityWeather(cityName, countryCode = "") {
    const { owmApiKey, units } = this.state;
    const baseApiUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${owmApiKey}&units=${units}`;
    // adds country code to the query if it was given
    const cityQuery =
      countryCode.length === 2 ? `${cityName},${countryCode}` : cityName;

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
      const cityId = owmData.id;
      this.setState(prevState =>
        update(prevState, {
          weatherData: { [cityId]: { $set: owmData } },
          selectedCityId: { $set: cityId }
        })
      );
    }
  }

  /* 
  Marks the given city as selected. Doesn't fetch data if recent enough data
  available.
  */
  selectCity(cityId, cityName, countryCode) {
    const { weatherData } = this.state;
    const cityWeatherData = weatherData[cityId];
    if (typeof cityWeatherData === "undefined") {
      // the data could be fetched using the cityId also but I didn't wanted to
      // keep things simple and not add another function/modify the function.
      this.fetchCityWeather(cityName, countryCode);
    } else if (Date.now() - 1000 * cityWeatherData.dt > 3600000) {
      // if existing data is older than 60 min, fetch fresh data
      this.fetchCityWeather(cityName, countryCode);
    } else {
      this.setState(prevState =>
        update(prevState, {
          selectedCityId: { $set: cityId }
        })
      );
    }
  }

  toggleFavourite(cityId) {
    const { favourites, weatherData } = this.state;
    if (this.constructor.checkIfIdIsKey(favourites, cityId)) {
      this.removeFavourite(cityId);
    } else {
      const cityData = weatherData[cityId];
      const cityName = cityData.name;
      const countryCode = cityData.sys.country;
      this.addFavourite(cityId, cityName, countryCode);
    }
  }

  /* 
  Add a new favourite to the localStorage and to the state.
  */
  addFavourite(cityId, cityName, countryCode) {
    const { favourites } = this.state;
    const favouritesUpdated = update(favourites, {
      [cityId]: { $set: { id: cityId, name: cityName, country: countryCode } }
    });
    localStorage.setItem("favourites", JSON.stringify(favouritesUpdated));

    this.setState({ favourites: favouritesUpdated });
  }

  /* 
  Remove a favourite from the localStorage and from the state.
  */
  removeFavourite(cityId) {
    const { favourites } = this.state;
    const favouritesUpdated = update(favourites, { $unset: [cityId] });
    localStorage.setItem("favourites", JSON.stringify(favouritesUpdated));

    this.setState({ favourites: favouritesUpdated });
  }

  render() {
    const { favourites, selectedCityId, weatherData } = this.state;
    let mainContent;

    switch (selectedCityId) {
      case false:
        mainContent = <CityNotFoundPage />;
        break;
      case "":
        mainContent = <InitialPage />;
        break;
      default:
        mainContent = (
          <CityPage
            data={weatherData[selectedCityId]}
            isFavourite={this.constructor.checkIfIdIsKey(
              favourites,
              selectedCityId
            )}
            toggleFavourite={this.toggleFavourite}
          />
        );
    }

    const favouritesEl =
      Object.keys(favourites).length > 0 ? (
        <FavouritesList favourites={favourites} selectCity={this.selectCity} />
      ) : (
        <p className="info-text">
          To add a favourite, search for a city first!
        </p>
      );

    return (
      <div className="content-wrapper">
        <aside className="sidebar card card--secondary">
          <h2 className="card__title">Favourites</h2>
          {favouritesEl}
        </aside>
        <main className="main-content card">
          <SearchForm fetchCityWeather={this.fetchCityWeather} />
          {mainContent}
        </main>
      </div>
    );
  }
}

export default App;
