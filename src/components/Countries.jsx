import axios from 'axios';
import { useEffect, useState } from 'react';

const Countries = ({ countries, searchTerm }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const filteredCountry = countries.filter((country) => {
    return country.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedCountry) {
        try {
          const apiKey = import.meta.env.VITE_SOME_KEY
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchWeatherData();
  }, [selectedCountry]);

  return (
    <div>
      {selectedCountry ? (
        // if selectedCountry is true
        <div key={selectedCountry.alpha2code}>
          <h3>{selectedCountry.name}</h3>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>Languages: {selectedCountry.languages.map((language) => language.name).join(', ')}</p>
          <img src={selectedCountry.flag} alt={`${selectedCountry.name} flag`} />

          {weatherData ? (
            // Render weather data if available
            <div>
              <h4>Weather in {selectedCountry.capital}</h4>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={`Weather icon for ${weatherData.weather[0].description}`} />
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          ) : (
            // Render loading message while fetching weather data
            <p>Loading weather data...</p>
          )}

          <button onClick={() => setSelectedCountry(null)}>Back to List</button>
        </div>
      ) : (
        // if selectedCountry is false
        filteredCountry.length === 1  ? (
          // Render details for a single matching country
          <div key={filteredCountry[0].alpha2code}>
            <h3>{filteredCountry[0].name}</h3>
            <p>Capital: {filteredCountry[0].capital}</p>
            <p>Area: {filteredCountry[0].area}</p>
            <p>Languages: {filteredCountry[0].languages.map((language) => language.name).join(', ')}</p>
            <img src={filteredCountry[0].flag} alt={`${filteredCountry[0].name} flag`} />
            
            
          </div>
        ) : filteredCountry.length < 10 ? (
          // Display just the name if there's less than 10
          filteredCountry.map((country) => (
            <div key={country.alpha2code}>
              {country.name}{' '}
              <button onClick={() => setSelectedCountry(country)}>Show Details</button>
            </div>
          ))
        ) : (
          // Render message when there are too many matching countries
          <div>
            <p>Too many countries match the query. Please make your query more specific.</p>
            {filteredCountry.slice(0, 10).map((country) => (
              <div key={country.alpha2code}>
                <h3>{country.name}</h3>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Countries;
