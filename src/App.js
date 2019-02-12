import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // NOTE: I do realize that this doesn't protect the API key from viewed
      // client-side but at least it isn't stored in the public repository.
      owmApiKey: process.env.REACT_APP_OWM_API_KEY
    };
  }

  render() {
    const { owmApiKey } = this.state;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Turku&APPID=${owmApiKey}`
    )
      .then(res => res.json())
      .then(json => console.log(json));

    return <div className="App" />;
  }
}

export default App;
