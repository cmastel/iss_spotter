const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Repsone ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipJSON = JSON.parse(body).ip;
    callback(error, ipJSON);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('https://ipvigilante.com/' + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Respone ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const data = {};
    body = JSON.parse(body);
    data['latitude'] = body.data.latitude;
    data['longitude'] = body.data.longitude;
    callback(error, data);
  });

};

module.exports = { fetchMyIP, fetchCoordsByIP };