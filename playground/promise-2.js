const request = require('request');
const api = require('./../apis/api');

var getGeocodeForAddress = (address) => {
  return new Promise((resolve,reject)=>{
    var encodedAddress = encodeURIComponent(address);
    var urlObj = {
      url: `${api.googleMaps.url}?address=${encodedAddress}&key=${api.googleMaps.key}`,
      json: true
    };
    request(urlObj, (error, response, body) => {
      if(error){
        reject(`Could not connect to URL: ${urlObj.url}`);
        return;
      }else if(body.status==='ZERO_RESULTS'){
        reject('Address NOT FOUND!');
        return;
      }else if(body.status==='OK'){
        //console.log(JSON.stringify(response, undefined, 2));
        debugger;
        var result = body.results[0].geometry.location;
        result.address = body.results[0].formatted_address;
        //console.log(`Latitude: ${body.results[0].geometry.location.lat} Longitude: ${body.results[0].geometry.location.lng}`);
        resolve(result);
      }
    });
  });
};

getGeocodeForAddress('Faridabad').then(
  (successMessage)=>console.log(successMessage),
  (errorMessage)=>console.log(errorMessage)
);

module.exports = {
  getGeocodeForAddress
};
