# Weather App

This is a weather application built with Angular, TypeScript, Bootstrap and npm.

## Project Setup

1. Install the dependencies by running `npm install`.
2. Start the development server by running `npm start`.

## Features

- Fetches weather data from OpenWeatherMap API.
- Caches the data for 15 minutes to reduce unnecessary API calls.

## Code Structure

- The main application logic is in the `src/app` directory.
- The `WeatherService` in [src/app/weather.service.ts](src/app/weather.service.ts) is responsible for fetching and caching weather data.

## Building the Project

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
