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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.latitude;
  const long = coords.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Respone ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    body = JSON.parse(body);
    const data = body.response;
    callback(error, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };