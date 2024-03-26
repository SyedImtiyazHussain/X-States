import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const getCountries = async() => {
    try{
      const response = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await response.json();
      setCountries(data);
    } catch(error) {
      console.error("Error fetching countries:",error);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  const getStates = async() => {
      try{
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        const data = await response.json();
        setStates(data);
      } catch(error) {
        console.error("Error fetching states:",error);
      }
  }

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  const getCities = async() => {
      try{
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        const data = await response.json();
      setCity(data);
    } catch(error) {
      console.error("Error fetching cities:",error);
    }
  }

  useEffect(() => {
    if (selectedState){
      getCities();
    }
  }, [selectedState]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="dropdown"
      >
        <option value="" disabled>Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select
        className="dropdown"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="" disabled>Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select
        className="dropdown"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="" disabled>Select City</option>
        {city.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {selectedCity && (
        <p>
          <span style={{ fontWeight: "bold" }}>You selected</span>{" "}
          <span style={{ fontWeight: "bolder", fontSize: "20px" }}>
            {selectedCity}
          </span>
          , <span style={{ color: "gray" }}>{selectedState}</span>,{" "}
          <span style={{ color: "gray" }}>{selectedCountry}</span>
        </p>
      )}
      </div>
    </div>
  );
}
