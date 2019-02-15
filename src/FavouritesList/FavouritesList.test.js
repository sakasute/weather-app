import React from "react";
import FavouritesList from "./FavouritesList";
import renderer from "react-test-renderer";

it("Favourites list renders correctly", () => {
  const favourites = {
    "633679": {
      id: 633679,
      name: "Turku",
      country: "FI"
    },
    "658225": {
      id: 658225,
      name: "Helsinki",
      country: "FI"
    }
  };

  const selectCity = (id, name, country) => {
    return;
  };

  const selectedCityId = "633679";

  const tree = renderer
    .create(
      <FavouritesList
        favourites={favourites}
        selectCity={selectCity}
        selectedCityId={selectedCityId}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
