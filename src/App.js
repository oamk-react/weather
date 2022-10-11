import './App.css';
import { useState,useEffect } from 'react';
import Weather from './Weather';

function App() {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setIsLoading(false)
      }, (error) => {
        alert(error.message);
      })
    }
    else {
      alert('Your browser does not support geolocation!')
    }
  }, [])
  
  if (isLoading) {
    return <p>Loading position...</p>
  } else {
    return (
      <div>
        <h3>Weather on your location</h3>
        <p>{lat.toFixed(3)},{lng.toFixed(3)}</p>
        <Weather lat={lat} lng={lng} />
      </div>
    );
  }
}

export default App;
