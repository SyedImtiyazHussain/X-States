import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (selectedCountry !== "") {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => response.json())
        .then((data) => setStates(data));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState !== "") {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => response.json())
        .then((data) => setCity(data));
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
