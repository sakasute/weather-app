import React from "react";

export default function CityPage({ data }) {
  const cityName = `${data.name}, ${data.sys.country}`;

  return (
    <div>
      <h2>{cityName}</h2>
    </div>
  );
}
