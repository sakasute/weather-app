import React from "react";
import "./FavouritesList.css";

export default function FavouritesList({
  favourites,
  selectCity,
  selectedCityId
}) {
  const favouriteLis = Object.values(favourites)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map(favourite => {
      const { id, name, country } = favourite;
      const classes =
        id === selectedCityId
          ? "favourites__item favourites__item--selected"
          : "favourites__item";
      return (
        <li
          className={classes}
          key={id}
          onClick={() => selectCity(id, name, country)}
        >{`${name}, ${country}`}</li>
      );
    });

  return <ul className="favourites">{favouriteLis}</ul>;
}
