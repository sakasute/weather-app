import React from "react";
import CityName from "../CityName/CityName";

export default function CityPage({ data, isFavourite, toggleFavourite }) {
  const cityName = `${data.name}, ${data.sys.country}`;
  // add "+" sign in front of positive temperatures and round temps
  const temp = Math.round(data.main.temp);
  const tempStr = temp > 0 ? `+${temp}` : temp;

  return (
    <div>
      <CityName isFavourite={isFavourite} toggleFavourite={toggleFavourite}>
        {cityName}
      </CityName>
      <h3>{tempStr} &deg;C</h3>
    </div>
  );
}
