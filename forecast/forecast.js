const request = require('request');
const api = require('./../apis/api');

var getForecastForGeocode = (geocode, errorCallback, successCallback) => {
  var urlObj = {
    url: `${api.forecast.url}/${api.forecast.key}/${geocode.lat},${geocode.lng}`,
    json: true
  };

  request(urlObj, (error, response, body) => {
    if(error){
      errorCallback(`Could not connect to URL: ${urlObj.url}`);
      return;
    }else if(response.statusCode=='404'||response.statusCode=='400'){
      errorCallback(`Failed to retrive forecast for URL: ${urlObj.url}`);
    }else if(response.statusCode=='200'){
      debugger;
      successCallback({
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}

module.exports = {
  getForecastForGeocode
};
