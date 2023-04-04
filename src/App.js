import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import Clock from 'react-clock'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';

function WeatherApp() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     try {

        

  //       const apiKey = 'a3ec02a0e0ee6a0ed29d7fee3607fcf6';
  //       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
  //       const response = await fetch(apiUrl);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setWeatherData((prevData) => [...prevData, data]);
  //       setError('');
  //     } catch (error) {
  //       setError(<h2
  //         className="error-message"
         
  //       >Are you sure thats a city?, Please try again.</h2>);
  //     }
  //   };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true); // set isLoading to true before making the API call
        const apiKey = 'a3ec02a0e0ee6a0ed29d7fee3607fcf6';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData((prevData) => [...prevData, data]);
        setError('');
      } catch (error) {
        setError(<h2 className="error-message">Are you sure thats a city?, Please try again.</h2>);
      } finally {
        setIsLoading(false); // set isLoading to false after the response is received
      }
    };

    if (query) {
      fetchWeatherData();
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.city.value);
  };

  const handleRemove = (index) => {
    setWeatherData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
   
    <MDBContainer  
    id='container' >
       
       <div>
  <h1 style={{
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  }}>
    <b>Weather 101</b>
  </h1>
  {/* <div className="clock-container" style={{
    position: 'fixed',
    top: '10px',
    left: '10px',
    fontSize: '20px',
    fontcolor: 'black',
    zIndex: '999999',
    width: '100px',
    height: '50px',
    background: 'white'
  }}>
    <div style={{ 
      display: 'inline-block' }}></div>
    <Clock value={time} />
  </div> */}
  <MDBRow className="centered">
    <form onSubmit={handleSubmit}>
      {/* <div className="input-group mb-3">
        <input
          type="text"
          className="form-control bg-light border-0 rounded-pill"
          placeholder="Search city"
          name="city"
          onChange={inputHandler}
          style={{ maxWidth: '400px', margin: '0 auto' }}

        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div> */}
      <div className="input-group mb-3" style={{ display: 'flex' }}>
  <input
    type="text"
    className="form-control"
    placeholder="Enter a city"
    name="city"
    id="city-input"
    onChange={inputHandler}
  />
  <div className="input-group-append inline">
    <button className="btn btn-primary" type="submit">
      Search
    </button>
  </div>
</div>
    </form>
  </MDBRow>
  {error && (
    <MDBRow>
      <p className="text-danger">{error}</p>
    </MDBRow>
  )}
  {/* <div className='weather-data'>
    {weatherData.map((data, index) => (
      <MDBRow key={index} className="weather-card">
        <MDBCol>
          <MDBCard className="my-3" style={{ maxHeight: '300px', overflow: 'hidden' }}>
            <MDBCardBody>
              <MDBCardTitle><b>{data.name}</b></MDBCardTitle>
              <MDBCardText>{data.weather[0].description}</MDBCardText>
              <MDBCardText>Temperature: {data.main.temp} ℃</MDBCardText>
              <MDBCardText>Wind Speed: {data.wind.speed} m/s</MDBCardText>
              <MDBCardText>Humidity: {data.main.humidity} %</MDBCardText>
              <MDBBtn color="danger" onClick={() => handleRemove(index)} className="remove-btn" ripple="false">
                <MDBIcon icon="trash" /> Remove
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    ))}
  </div> */}
  <div className='weather-data'>
  {weatherData.map((data, index) => {
    let weatherClass = '';
    switch (true) {
      case data.weather[0].description.includes('fog'):
        weatherClass = 'fog';
        break;
      case data.weather[0].description.includes('clear'):
        weatherClass = 'clear';
        break;
      case data.weather[0].description.includes('mist'):
        weatherClass = 'mist';
        break;
      case data.weather[0].description.includes('cloud'):
        weatherClass = 'cloudy';
        break;
      case data.weather[0].description.includes('rain'):
        weatherClass = 'rainy';
        break;
      case data.weather[0].description.includes('snow'):
        weatherClass = 'snowy';
        break;
      default:
        weatherClass = '';
    }
    return (
      <MDBRow key={index} className={`weather-card ${weatherClass}`}>
        <MDBCol>
          <MDBCard className="my-3" style={{ maxHeight: '300px', overflow: 'hidden' }}>
            <MDBCardBody>
              <MDBCardTitle><b>{data.name}</b></MDBCardTitle>
              <MDBCardText>{data.weather[0].description}</MDBCardText>
              <MDBCardText>Temperature: {data.main.temp} ℃</MDBCardText>
              <MDBCardText>Wind Speed: {data.wind.speed} m/s</MDBCardText>
              <MDBCardText>Humidity: {data.main.humidity} %</MDBCardText>
              <MDBBtn color="danger" onClick={() => handleRemove(index)} className="remove-btn" ripple="false">
                <MDBIcon icon="trash" /> Remove
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  })}
</div>

</div>
</MDBContainer>

  );
}

export default WeatherApp;
