import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

const ShowCountry = ({countrylist, clickHandler}) => {

  if (countrylist.length > 10) {
    return <div>Too many matches! Please specify your search.</div>;
  }else if(countrylist.length > 1){
    return (<ul>
      {countrylist.map(country => <li key={country.numericCode}>{country.name}<button id={country.name} onClick={clickHandler}>show</button></li>)}
      </ul>);
  }else if(countrylist.length === 1){
    const country = countrylist[0];
    return(
      <div>
        <h2>{country.name}</h2>
        Capitol: {country.capital}<br/>
        Population: {country.population}
        <h3>Languages</h3>
        <ul>
          {country.languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} alt={`${country.name}_flag`} style={{maxWidth: "200px"}} />

      </div>
    )
  }

  return (
    <div></div>
  )
}


const App = () => {

  const [countryList, setCountryList] = useState([]);
  const [countryFilter, setCountryFilter] = useState("Find");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        console.log(response.data);
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
    <ShowCountry countrylist={countriesToShow} clickHandler={handleClick} />
  </div>
}



ReactDOM.render(<App />, document.getElementById('root'))