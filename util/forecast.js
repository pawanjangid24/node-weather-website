const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3dfb711aa7de0066c7b357a08f7cbee5/'+latitude+','+longitude

    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('not able to connect!', undefined)
        }else if(body.length === 0){
            callback('no data avaialble', undefined)
        }else {
            callback(undefined, 'forecast is: '+body.currently.summary)
        }
    })
}

module.exports = forecast;