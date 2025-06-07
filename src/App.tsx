import { useEffect, useState } from 'react';
import './App.css'
import { fetchWeatherData } from './services/weatherService';
import Header from './components/Header';
import WeatherCard from './components/WeatherCards';
import type { WeatherDisplayData } from './models/weather';
import { Box, Container, Typography, Alert} from '@mui/material';



function App() {

  const [weatherData, setWeatherData] = useState<WeatherDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadWeatherData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchWeatherData();
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to load weather data. Please check your internet connection and try again.';
      setError(errorMessage);
      console.error('Weather data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const defaultWeather: WeatherDisplayData = {
     name: '',
    description: '',
    temp: 0,
    feels_like: 0,
    humidity: 0,
    country: '',
    icon: '',
    main: ''
  };


  return (
    <Box sx={{ minHeight: '80vh', maxHeight:'100vh', py: 4 }}>
      <Container maxWidth={false}>
        <Header lastUpdated={lastUpdated || undefined} />
  
        {error && (
          <Alert severity="error" sx={{ my: 3 }}>
            {error}
          </Alert>
        )}
  
        {!error && (
          <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={3}
          sx={{ mt: 2 }}
        >
          {(isLoading ? Array.from({ length: 4 }) : weatherData).map((item, index) => {
            const weather: WeatherDisplayData = !isLoading
              ? (item as WeatherDisplayData)
              : defaultWeather;
        
            return (
              <Box key={index} sx={{ width: 300 }}>
                <WeatherCard isLoading={isLoading} weather={weather} />
              </Box>
            );
          })}
        </Box>
        )}
  
        {!error && weatherData.length === 0 && !isLoading && (
          <Box textAlign="center" mt={6}>
            <Typography color="text.secondary">
              אין מידע זמין, נא לרענן את הדף.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;

