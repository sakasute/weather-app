import React from "react";

import "./CityPage.css";

export default function CityPage({ data, isFavourite, toggleFavourite }) {
  const cityName = `${data.name}, ${data.sys.country}`;
  // add "+" sign in front of positive temperatures and round temps
  const temp = Math.round(data.main.temp);
  const tempStr = temp > 0 ? `+${temp}` : temp;

  const btnClasses = isFavourite
    ? "city__fav-btn  city__fav-btn--remove"
    : "city__fav-btn";

  const btnText = isFavourite ? "UNFAVOURITE" : "FAVOURITE";

  return (
    <section className="city">
      <h2 className="city__name">{cityName}</h2>
      <button className={btnClasses} onClick={() => toggleFavourite(data.id)}>
        {btnText}
      </button>
      <h3 className="city__temp">{tempStr} &deg;C</h3>
      <span className="city__data-disclaimer">
        Weather data provided by{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeatherMap
        </a>
      </span>
    </section>
  );
}
