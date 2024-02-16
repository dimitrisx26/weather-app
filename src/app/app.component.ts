import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  defaultCity: string = 'Athens';
  searchInput: string = '';
  weatherData: any = {};
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather(this.defaultCity).subscribe((data: any) => {
      this.weatherData = data;
    });
  }

  onSearchLocation(city: string) {
    if (city === '') {
      return;
    }
    this.weatherService.getWeather(city).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.showError = false;
      },
      error: (error) => {
        console.log('Error: ', error);
        this.errorMessage = 'Error finding city, please try again.';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      },
    });
  }
}
