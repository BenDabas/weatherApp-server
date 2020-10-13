const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3a818f2ea365331b114a69c6f9e66de2&query=${latitude},${longitude}`;
    // 'http://api.weatherstack.com/current?access_key=3a818f2ea365331b114a69c6f9e66de2&query=' +
    // latitude +
    // ',' +
    // longitude +
    // '&units=f';
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to connect weather service!!', undefined);
        } else {
            callback(
                undefined,
                'It is currently ' +
                    response.body.current.temperature +
                    ' degrees out. It feels like ' +
                    response.body.current.feelslike +
                    ' degrees out'
            );
        }
    });
};

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude;

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined);
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined);
//         } else {
//             callback(
//                 undefined,
//                 response.body.daily.data[0].summary +
//                     ' It is currently ' +
//                     response.body.currently.temperature +
//                     ' degress out. There is a ' +
//                     response.body.currently.precipProbability +
//                     '% chance of rain.'
//             );
//         }
//     });
// };
module.exports = forecast;
