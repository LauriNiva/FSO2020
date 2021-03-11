import React, { useState, useEffect } from 'react';
import axios from "axios";

const Weather = ({ capital, api_key }) => {

    const [capitalWeather, setCapitalWeather] = useState([]);
  
    useEffect(() => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then((response) => {
          setCapitalWeather(response.data);
        });
    }, [capital, api_key]);
  
    if (capitalWeather.current) {
  
      const weatherImages = capitalWeather.current.weather_icons.map(
        img => <div key={img}><img src={img} alt="" /></div>
      );
  
      return (
        <div>
          Temperature: {capitalWeather.current.temperature} Celsius<br/>
          {weatherImages}
          Wind: {capitalWeather.current.wind_speed} km/h direction {capitalWeather.current.win_dir}
        </div>
      );
    } else {
      return <div></div>
    }
  }

  export default Weather;