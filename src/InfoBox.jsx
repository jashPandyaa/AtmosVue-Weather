import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import SunnyIcon from '@mui/icons-material/Sunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import CompressIcon from '@mui/icons-material/Compress';
import AirIcon from '@mui/icons-material/Air';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function InfoBox({ info, convertTemp, unit }){
    const HOT_URL = "https://plus.unsplash.com/premium_photo-1673264933056-8f2f9c87742f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VuJTIwaW1hZ2VzfGVufDB8fDB8fHww";
    const COLD_URL = "https://plus.unsplash.com/premium_photo-1675348351418-51fcc1b6611c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const RAINY_URL = "https://images.unsplash.com/photo-1691265693071-17c35bc733d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhaW55JTIwc2Vhc29ufGVufDB8fDB8fHww";

    const weatherIcon = info.humidity > 80 ? 
        <ThunderstormIcon fontSize="large" color="primary" /> : 
        info.temp > 15 ? 
        <SunnyIcon fontSize="large" color="secondary" /> : 
        <AcUnitIcon fontSize="large" color="primary" />;

    const weatherDescription = info.weather.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return (
        <div className='InfoBox'>
            <div className='cardContainer'>
                <Card sx={{ maxWidth: 500, borderRadius: 3, boxShadow: 3 }}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image={info.humidity > 80 ? RAINY_URL : info.temp > 15 ? HOT_URL : COLD_URL}
                        title={info.city}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            {info.city} {weatherIcon}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                            Feels like {convertTemp(info.feelsLike)}°{unit === 'celsius' ? 'C' : 'F'} • {weatherDescription}
                        </Typography>
                        
                        <div className="weather-grid">
                            <div className="weather-item">
                                <ThermostatIcon /> Temperature: {convertTemp(info.temp)}°{unit === 'celsius' ? 'C' : 'F'}
                            </div>
                            <div className="weather-item">
                                <OpacityIcon /> Humidity: {info.humidity}%
                            </div>
                            <div className="weather-item">
                                <CompressIcon /> Min/Max: {convertTemp(info.tempMin)}°/{convertTemp(info.tempMax)}°{unit === 'celsius' ? 'C' : 'F'}
                            </div>
                            <div className="weather-item">
                                <AirIcon /> Wind: {info.windSpeed} m/s
                            </div>
                            <div className="weather-item">
                                <SpeedIcon /> Pressure: {info.pressure} hPa
                            </div>
                            <div className="weather-item">
                                <VisibilityIcon /> Visibility: {info.visibility} km
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}