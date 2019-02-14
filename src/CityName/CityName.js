import React from "react";

export default function CityName({
  children,
  cityId,
  isFavourite,
  toggleFavourite
}) {
  return (
    <div>
      <h2>{children}</h2>
      <span onClick={() => toggleFavourite(cityId)}>{`${isFavourite}`}</span>
    </div>
  );
}
