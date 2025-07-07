import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState, useEffect } from "react";
import {FaReact, FaGithub, FaLinkedin, FaEnvelope} from 'react-icons/fa';
import "./WeatherApp.css";

export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "haze",
        windSpeed: 0,
        pressure: 0,
        visibility: 0
    });

    const [unit, setUnit] = useState('celsius');
    const [lastUpdated, setLastUpdated] = useState('');

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
        setLastUpdated(new Date().toLocaleTimeString());
    };

    const toggleUnit = () => {
        setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
    };

    const convertTemp = (temp) => {
        if (unit === 'fahrenheit') {
            return (temp * 9/5 + 32).toFixed(2);
        }
        return temp;
    };

    return (
        <div className="weather-app-container">
            <div className="weather-app-content">
                <h1 className="app-title">AtmosVue Weather</h1>
                <div className="unit-toggle">
                    <button onClick={toggleUnit}>
                        Switch to {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
                    </button>
                    {lastUpdated && <span className="last-updated">Last updated: {lastUpdated}</span>}
                </div>
                <SearchBox updateInfo={updateInfo}></SearchBox>
                <InfoBox info={weatherInfo} convertTemp={convertTemp} unit={unit}></InfoBox>
                <div className="footer">
    <p>
        Built with <FaReact className="react-icon" /> by
        <a 
            href="https://github.com/jashPandyaa" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="author-link"
        >
            Jash Pandya
        </a>
    </p>
    <div className="footer-links">
        <a href="https://github.com/jashPandyaa" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
        </a>
        <a href="https://linkedin.com/in/jash-pandya" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
        </a>
        <a href="mailto:jashpandyaa@gmail.com" aria-label="Email">
            <FaEnvelope />
        </a>
    </div>
</div>
            </div>
        </div>
    );
};