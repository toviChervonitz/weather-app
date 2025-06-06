import type {WeatherDisplayData , WeatherResponse} from '../models/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
const cities = ['Eilat' , 'London' , 'New York' , 'Alaska'];

export const fetchWeathetData = async(): Promise<WeatherDisplayData[]> =>{
    if(! API_KEY){
        throw new Error('OpenWeatherMap API key is required. Please add VITE_OPENWEATHER_API_KEY to your environment variables.');
    }

    try{
        const promises = cities.map(city => 
            fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=he`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch weather data for ${city}`);
                }
                return response.json();
              })
          );

          const results: WeatherResponse[] = await Promise.all(promises);

          return results.map(data => ({
            name: data.name,
            description: data.weather[0].description,
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            country: data.sys.country,
            icon: data.weather[0].icon,
            main: data.weather[0].main
          }));
          
    } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }

}

