import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "./App";

// This is the create-react-app example test
it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

/*  
Not a very necessary test but something to start with.
*/
it("Favourites-sidebar is visible", () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId("favourites-sidebar")).toBeVisible();
});

it("SearchForm is visible", () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId("search-form")).toBeVisible();
});

const searchTestSetup = () => {
  const utils = render(<App />);
  const input = utils.queryByTestId("search-input");
  const goBtn = utils.queryByTestId("search-btn");

  return { input, goBtn, ...utils };
};

afterEach(cleanup);

it("Text input into search field works", () => {
  const { input } = searchTestSetup();
  fireEvent.change(input, { target: { value: "New York, US" } });
  expect(input.value).toBe("New York, US");
});
