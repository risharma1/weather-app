const yargs = require('yargs');
const api = require('./apis/api');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');
const axios = require('axios');

/**
Main intention is to handle input address and encode it to be sent to the api url in request
*/
const argv = yargs
  .options({
    address:{
      demand: true,
      alias: 'a',
      string: true,
      describe: 'Address input for Google maps API'
    }
  })
  .help()
  .alias('help','h') //alias for diff flags can be added like this
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `${api.googleMaps.url}?address=${encodedAddress}&key=${api.googleMaps.key}`;

  axios.get(geocodeUrl).then((response)=>{
    //console.log(response.data);
    //debugger;
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find the address provided.');
    }else if(response.data.status==='OK'){
      var forecastUrl = `${api.forecast.url}/${api.forecast.key}/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}`;
      return axios.get(forecastUrl);
    }
  })
  .then((response)=>{
    debugger;
    if(response.status=='200'){
      var result = {
        temperature: response.data.currently.temperature,
        apparentTemperature: response.data.currently.apparentTemperature
      };
      console.log(`It's currently ${result.temperature} but it feels like ${result.apparentTemperature}`);
    }else{
      console.log(response);
    }
  })
  .catch((e)=>{
    //debugger;
    if(e.code==='ENOTFOUND'){
      console.log('Unable to connect to the servers.');
    }else{
      console.log(e.message);
    }
  });
