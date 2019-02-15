# weather-app

The project is live as a Github Pages-page here: https://sakasute.github.io/weather-app/

A simple web app to retrieve current weather in a given city. Cities can be saved as favourites on client side for easy reaccess.

## External tools

I used create-react-app to bootstrap this project. Additionally, [immutability-helper](https://github.com/kolodny/immutability-helper) was used to make handling nested objects inside state more elegant. [gh-pages] was used to easily deploy the project to the Github Pages (just needs a command `npm run deploy`). Also I installed some testing utilities.

The weather data is sourced from [OpenWeatherMap](https://openweathermap.org/). I first checked out [Dark Sky](https://darksky.net/dev/docs) but it seemed to only support search by coordinates so I would have had to use another service to get coordinates for each city.

The visual appearance was inspired by the site https://dev.to/

## Using the site

1. Search for a city with the search bar.

- Both, just a city name and a city name and two-letter country code separated by a comma, work.
- If just a city name is used, OpenWeatherMap gives you its first guess as result.
- E.g. search "London" gives you "London, GB" but "London, US" gives you "London, US".

2. After you have found a city, there is a green "FAVOURITE" button. Clicking it, adds the city to the sidebar on the left (or on the bottom on narrow screens). The "FAVOURITE" button changes into an "UNFAVOURITE" button that removes the city from favourites.

3. Now you can select a favourite city from the favourites list.

## Not immediately clear features

- The app uses localStorage to save the user's favourites into the browser so they can be accessed after page reloads.
- When selecting a city from favourites list, the app checks if the current locally saved data is under 60 minutes old. If so, new data is not fetched and the locally saved data is used.
- On narrow screens, the favourites sidebar wraps below the main content.

## Instructions to run the app locally

As mentioned, the app is live here: https://sakasute.github.io/weather-app/

Naturally, the app can be ran locally too. The basics are as always:

1. clone the repo
2. `npm i`
3. `npm start`

However, I decided to save my personal API key for the OpenWeatherMap inside a .env-file so I wouldn't need to commit it to the repository. Of course I know, that this doesn't really protect the API key because the application is strictly client-side and therefore the has to be sent to the client anyway. I just felt it was a good idea to keep it away from the repository. And now I'm going to go back on all that and give the API key here in the readme so the app can be tested locally! (Generating new key from OpenWeatherMap is easy anyways).

The project needs the following `.env`-file in its root:

```
REACT_APP_OWM_API_KEY=295954eace9aec900796d0ba9ae013bc
```

Without it, the project crashes when trying to fetch weather data.

## Tests

Testing, especially JS/React apps, isn't very familiar to me but I did write a few simple tests. Tests are run with the command `npm test`. Most of the tests are in `App.test.js`-file but there is also one snapshot test in `FavouritesList/FavouritesList.test.js`-file.

The tests in ´App.test.js´-file are very basic. They mainly test that the main parts of the application are visible and that the search bar input works. The FavouritesList snapshot test tests that the favourites list rendering doesn't change unexpectedly.

What I would have liked to test more was integration between the parts of the application. E.g. when clicking the GO-button to search, the correct Components would be shown or when clicking the FAVOURITE button, the favourites-list would get new item. Also, testing the data fetching logic would have been good. However, these seemed a bit more involved cases and my time was limited.

I used `react-testing-library`, `jest-dom` and `react-test-renderer` in addition to create-react-app's testing setup to help a bit with the tests.

## Bugs & Known issues

- Very little input validation is done (in search input). This is mainly an UX issue because the actual security concerns would mostly be on the server side and in this case the server is OpenWeatherMap's API-server.
- UX is lacking in other ways also. Mainly there isn't any indication that a search is going on. So on slow internet connection the application seems frozen when waiting for the search result.
- Doesn't work on Internet Explorer because `fetch` is used (at least because of that).
- Especially, in a bigger application, it would have been beneficial to have more reusable and smaller components. This was a small enough project that there wasn't too much repetition with the abstraction level that I chose. Also PropTypes would have been beneficial, especially if the project was bigger.

## Ideas for new features

- Loading-spinner when waiting for results
- Use browsers' location api to get current location for the initial page load.
- A button to manually fetch up-to-date data. Also, show to the user, how old the data is (when OWM has last time updated their data).
- Use URL-parameters to link directly to a given city's weather page.
- Use for example https://websygen.github.io/owfont/ to show nice weather icons for the user (OWM has it's own icon set also, but they aren't very nice looking. The linked project uses the same naming scheme). Also, extract more descriptive weather info for the user from the API-response.
- Sort/group the favourites list also by country (currently sorted alphabetically).
