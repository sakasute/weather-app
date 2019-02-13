import React from "react";

export default function CityName({ children, isFavourite, toggleFavourite }) {
  return (
    <div>
      <h2>{children}</h2>
      <span onClick={toggleFavourite}>{`${isFavourite}`}</span>
    </div>
  );
}
