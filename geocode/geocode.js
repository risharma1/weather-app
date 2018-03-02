const request = require('request');
const api = require('./../apis/api');

var getGeocodeForAddress = (address,errorCallback,successCallback) => {
  var encodedAddress = encodeURIComponent(address);
  var urlObj = {
    url: `${api.googleMaps.url}?address=${encodedAddress}&key=${api.googleMaps.key}`,
    json: true
  };
  request(urlObj, (error, response, body) => {
    if(error){
      errorCallback(`Could not connect to URL: ${urlObj.url}`);
      return;
    }else if(body.status==='ZERO_RESULTS'){
      errorCallback('Address NOT FOUND!');
      return;
    }else if(body.status==='OK'){
      //console.log(JSON.stringify(response, undefined, 2));
      debugger;
      var result = body.results[0].geometry.location;
      result.address = body.results[0].formatted_address;
      //console.log(`Latitude: ${body.results[0].geometry.location.lat} Longitude: ${body.results[0].geometry.location.lng}`);
      successCallback(result);
    }
  });
};

module.exports = {
  getGeocodeForAddress
};
