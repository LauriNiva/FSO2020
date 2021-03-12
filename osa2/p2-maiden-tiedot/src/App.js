import React, { useState, useEffect } from 'react';
import axios from "axios";
import ShowCountry from './components/ShowCountry';


const App = ({api_key}) => {

    const [countryList, setCountryList] = useState([]);
    const [countryFilter, setCountryFilter] = useState("Find");
  
    useEffect(() => {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((response) => {
          setCountryList(response.data);
        })
    }, []);
  
    const handleFilterChange = (e) => {
      setCountryFilter(e.target.value);
    };
  
    const handleClick = (e) => {
      setCountryFilter(e.target.id);
    }
  
    const countriesToShow = countryList.filter(country =>
      country.name.toLowerCase().includes(countryFilter.toLowerCase())
    );
  
    return <div>
      Find countries<input value={countryFilter} onChange={handleFilterChange} />
      <ShowCountry countrylist={countriesToShow} clickHandler={handleClick} api_key={api_key} />
    </div>
  }

  export default App;