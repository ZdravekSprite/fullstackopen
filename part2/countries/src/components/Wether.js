import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Wether = ({ capital }) => {

  const [ city, setCity ] = useState({
    temperature: 0,
    weather_icons: [""],
    wether_descriptions: [""],
    wind_speed: 0,
    wind_dir: ""
  })

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  //console.log(API_KEY)

  const link = 'http://api.weatherstack.com/current?access_key='+
                API_KEY+
                '&query='+
                capital
  //console.log(link)

  useEffect(() => {
    axios
      .get(link)
      .then(response => {
        setCity(response.data.current)
      })
  }, [])
  //console.log("city", city)

  return (
    <div>
      <h3>Wether in {capital}</h3>
      <div><b>temperature:</b>{city.temperature} Celcius</div>
      <img src={city.weather_icons} alt={city.weather_descriptions} height="50"/>
      <div><b>wind:</b>{city.wind_speed} mph direction {city.wind_dir}</div>
    </div>
  )
}

export default Wether