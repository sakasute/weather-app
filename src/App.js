import React, { Component } from "react";
import "./App.css";
import "./SearchForm/SearchForm";
import SearchForm from "./SearchForm/SearchForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // NOTE: I do realize that this doesn't protect the API key from being viewed
      // client-side but at least it isn't stored in the public repository.
      owmApiKey: process.env.REACT_APP_OWM_API_KEY,
      units: "metric", // 'imperial' or 'metric'
      weatherData: []
    };
  }

  render() {
    const { owmApiKey, units } = this.state;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Inari&units=${units}&APPID=${owmApiKey}`
    )
      .then(res => res.json())
      .then(json => console.log(json));

    return (
      <div className="App">
        <SearchForm />
      </div>
    );
  }
}

export default App;
