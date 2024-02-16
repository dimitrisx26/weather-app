import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  api = '&appid=75cec7c3f4300600d64abf22fc7a2269&units=metric';

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return timer(0, 15 * 60 * 1000).pipe(
      switchMap(() => {
        const cachedDataString = localStorage.getItem(city);
        const cachedData = cachedDataString
          ? JSON.parse(cachedDataString)
          : null;
        const currentTime = Date.now();
        if (cachedData && currentTime - cachedData.timestamp < 15 * 60 * 1000) {
          return of(cachedData.data);
        } else {
          const request = this.http.get(this.weatherURL + city + this.api);
          request.subscribe((data) => {
            localStorage.setItem(
              city,
              JSON.stringify({ data, timestamp: currentTime })
            );
          });
          return request;
        }
      })
    );
  }
}
