const express = require('express');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3002;
const WEATHER_API_KEY = '062674477fb2a4f23b6a3bd319f1c06a';

app.use(express.json());
app.use(express.static('public'));

app.get('/weather/:location', async (req, res) => {
  const location = req.params.location;
  
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`);
    const weatherData = response.data;
    
    res.json({
      location: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed
    });
  } catch (error) {
    res.status(500).json({ error: error.response.data.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
