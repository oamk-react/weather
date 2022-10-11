import React, { useState,useEffect } from 'react'
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ICON_URL = 'http://openweathermap.org/img/wn/';
const API_KEY = 'ec4d9c0f0a9b1dbe1bcd36a32a040bd1';

export default function Weather({lat,lng}) {
  const [temp, setTemp] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(0);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const url = API_URL +
    'lat=' + lat + 
    '&lon=' +  lng +
    '&units=metric' +
    '&appid=' + API_KEY;
     axios.get(url)
     .then((response) => {
      const result = response.data
      console.log(result)
      if (result.main != undefined) {
        setTemp(result.main.temp);
        setSpeed(result.wind.speed);
        setDirection(result.wind.deg);
        setDescription(result.weather[0].description);
        console.log(ICON_URL + result.weather[0].icon + '@2x.png');
        setIcon(ICON_URL + result.weather[0].icon + '@2x.png');
      }
     }).catch(error => {
      console.log(error)
      alert("Could not retrieve weather information")
     })
  }, [])
  

  return (
    <>
      <h3>Weather on your location</h3>
      <p>{temp} C&#176;</p>
      <p>{speed} m/s {direction} degrees</p>
      <p>{description}</p>
      <img src={icon} alt=""/>
    </>
  )
}
