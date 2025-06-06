import { useEffect, useState } from 'react';
import './App.css'
import { fetchWeathetData } from './services/weatherService';
import Header from './components/Header';
import WeatherCard from './components/WeatherCards';
import type { WeatherDisplayData } from './models/weather';
import { Box, Container, Typography, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';



function App() {

  const [weatherData, setWeatherData] = useState<WeatherDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadWeatherData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchWeathetData();
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
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
            {isLoading && weatherData.length === 0
              ? Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                  <WeatherCard weather={{} as WeatherDisplayData} isLoading />
                </Grid>
              ))
              : weatherData.map((weather, index) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={`${weather.name}-${index}`}>
                  <WeatherCard weather={weather} />
                </Grid>
              ))}
          </Grid>
        )}

        {!error && weatherData.length === 0 && !isLoading && (
          <Box textAlign="center" mt={6}>
            <Typography color="text.secondary">אין מידע זמין, נא לרענן את הדף.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;

