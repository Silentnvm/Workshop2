import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [culoareverde, setCuloareverde] = useState(0);
  const [culoareIndex, setCuloareIndex] = useState(0);
  const [catUrl, setCatUrl] = useState('');
  interface LocationInfo {
    country: string;
    city: string;
    regionName: string;
    lat: number;
    lon: number;
  }

  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const culori = ['green', 'blue', 'pink', 'yellow', 'red', 'orange', 'purple', 'brown'];

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?api_key=live_d7zNjuYMnUUxog47EOd1lNwM8Dpf9Z4ZU5M9RHjJs6uSwQzVy8AceZf2OZYQiKLA')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setCatUrl(data[0].url);
        }
      })
  }, []);

  useEffect(() => {
    fetch('/location-info')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); 
      })
      .then(text => {
        try {
          const data = JSON.parse(text);
          setLocationInfo(data); 
        } catch (error) {
          console.error("Failed to parse JSON:", text); 
          throw new Error('Received response is not valid JSON'); 
        }
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);


  const swapBgColor = () => {
    if (culoareverde) {
      setCuloareverde(0);
      document.body.style.backgroundColor = '';
    }
    else {
      setCuloareverde(1);
      document.body.style.backgroundColor = 'green';

    }
  };
  const swapBgColorIndex = () => {
    const nextCuloare = (culoareIndex + 1) % culori.length;
    setCuloareIndex(nextCuloare);
    document.body.style.backgroundColor = culori[nextCuloare];
  };

  const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * culori.length);
    document.body.style.backgroundColor = culori[randomIndex];
  };


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Nitu Tiberiu-Florian Project1</h1>
      <div className="card">
        <button onClick={swapBgColor} style={{ marginRight: '10px' }}>
          Change to Green
        </button>
        <button onClick={swapBgColorIndex} style={{ marginRight: '10px' }}>
          Change to Next Color
        </button>
        <button onClick={randomColor}>
          Change to Random Color
        </button>
      </div>
      {catUrl && <img src={catUrl} alt="Random Cat" style={{ width: '500px', height: '500px', objectFit: 'cover' }} />}
      {locationInfo && (
        <div style={{ marginTop: '20px' }}>
          <h2>Your location information:</h2>
          <p>Country: {locationInfo.country}</p>
          <p>City: {locationInfo.city}</p>
          <p>Region: {locationInfo.regionName}</p>
          <p>Latitude: {locationInfo.lat}</p>
          <p>Longitude: {locationInfo.lon}</p>
        </div>
      )}
    </>
  )
}

export default App