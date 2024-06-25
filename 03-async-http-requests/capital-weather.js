const axios = require('axios');
require('dotenv').config();
const yargs = require('yargs')

const apiKey = process.env.OPENWEATHERMAP_API_KEY;



function findCapitalWeather(country) {
    
axios.get("https://restcountries.com/v3.1/name/"+country).then(res => {

    const capital = res.data[0].capital[0];
    console.log(`capital: ${capital}`);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&lang=tr&units=metric`).then(weatherRes => {
        console.log(weatherRes.data);
        console.log(`today's temperature in the capital ${weatherRes.data.name} is ${weatherRes.data.main.temp} degrees` );

    }).catch(error => {
        console.error(`error: ${error}`);
    });

}).catch(error => {
    console.error(`error: ${error}`);
});
}

module.exports = findCapitalWeather