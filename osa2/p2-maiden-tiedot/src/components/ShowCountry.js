import React from 'react';
import Weather from './Weather';

const ShowCountry = ({ countrylist, clickHandler, api_key }) => {

    if (countrylist.length > 10) {
      return <div>Too many matches! Please specify your search.</div>;
    } else if (countrylist.length > 1) {
      return (<ul>
        {countrylist.map(country => <li key={country.numericCode}>{country.name}<button id={country.name} onClick={clickHandler}>show</button></li>)}
      </ul>);
    } else if (countrylist.length === 1) {
      const country = countrylist[0];
  
      return (
        <div>
          <h2>{country.name}</h2>
          Capitol: {country.capital}<br />
          Population: {country.population}
          <h3>Languages</h3>
          <ul>
            {country.languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)}
          </ul>
          <img src={country.flag} alt={`${country.name}_flag`} style={{ maxWidth: "200px" }} />
  
          <h3>Weather in {country.capital}</h3>
  
          <Weather capital={country.capital} api_key={api_key} />
  
        </div>
      )
    }
  
    return (
      <div></div>
    )
  }

export default ShowCountry;