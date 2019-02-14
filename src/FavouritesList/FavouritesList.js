import React from "react";

export default function FavouritesList({ favourites, selectCity }) {
  const favouriteLis = Object.values(favourites).map(favourite => {
    const { id, name, country } = favourite;
    return (
      <li
        key={id}
        onClick={() => selectCity(id, name, country)}
      >{`${name}, ${country}`}</li>
    );
  });

  return <ul>{favouriteLis}</ul>;
}
