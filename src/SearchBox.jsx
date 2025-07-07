import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "0a9f2d5d4bada9cc7b9d59a669d77567";

    let weatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();          

            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                windSpeed: jsonResponse.wind.speed,
                pressure: jsonResponse.main.pressure,
                visibility: jsonResponse.visibility / 1000
            };
            return result;
        } catch(error) {
            throw error;
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
        setError(false);
    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault(); 
            setLoading(true);
            let newInfo = await weatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch(error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='searchbox'>
            <form onSubmit={handleSubmit}>
                <div className="search-container">
                    <TextField 
                        id="city" 
                        label="Enter city name" 
                        variant="outlined" 
                        required 
                        value={city} 
                        onChange={handleChange}
                        fullWidth
                        sx={{ maxWidth: 500 }}
                    />  
                    <Button 
                        variant="contained" 
                        type="submit" 
                        disabled={loading}
                        startIcon={<SearchIcon />}
                        sx={{ mt: 2 }}
                    >
                        Search
                    </Button>
                </div>
                {error && <p className="error-message">No such place exists. Please try another location.</p>}
            </form>
        </div>
    );
}