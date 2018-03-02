const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');
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

geocode.getGeocodeForAddress(argv.address,(errorMessage)=>console.log(errorMessage),
(geocodedAddress)=>{
  //success
  console.log(`Address : ${geocodedAddress.address}`);
  console.log(`Latitude: ${geocodedAddress.lat} Longitude: ${geocodedAddress.lng}`);
  forecast.getForecastForGeocode(geocodedAddress,(errorMessage)=>console.log(errorMessage),(result)=>{
    //success
    console.log(`Current temperature in ${geocodedAddress.address} is ${result.temperature} which feels like ${result.apparentTemperature}`);
  });
}
);
