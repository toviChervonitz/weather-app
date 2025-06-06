import React from 'react';
import {Sun, Snowflake, Droplets, Thermometer,CloudSun } from 'lucide-react';
import type { WeatherDisplayData } from '../models/weather';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';

interface WeatherCardProps {
    weather: WeatherDisplayData;
    isLoading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
    console.log(weather);

    const getWeatherIcon = (feelsLike: number) => {
        if (feelsLike <= 20) return <Snowflake style={{ color: '#2196f3' }}/>;   
        if (feelsLike < 30) return <CloudSun  style={{ color: '#ffb300' }}/>;             
        return <Sun  style={{ color: '#ff5722' }}/>;  
    };


if (isLoading) {
    return (
        <Card sx={{ width: 300, height: 200, padding: 2, textAlign: 'center' }}>
            <Typography variant="body1">טוען...</Typography>
        </Card>
    );
}

return (
    <Card sx={{ width: 300, borderRadius: 3, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        {weather.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {weather.country}
                    </Typography>
                </Box>
                {getWeatherIcon(weather.feels_like)}
            </Box>

            <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
                {weather.temp}°C
            </Typography>

            <Typography variant="body1" align="center" gutterBottom>
                {weather.description}
            </Typography>

            <Stack spacing={1} mt={2}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Thermometer size={18} />
                    <Typography variant="body2">
                        טמפ' מורגשת: {weather.feels_like}°
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <Droplets size={18} />
                    <Typography variant="body2">
                        לחות: {weather.humidity}%
                    </Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);
  };

export default WeatherCard;
