const request = require('request');

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGF3YW5qYW4yNCIsImEiOiJjazM0cGw5NmIwcm96M2NtcTdlMnplOWl1In0.BdaKz-XG_WJxRTg8PPVRuQ&limit=1'

    request({url : url, json : true}, (error, {body}) => {
        if(error){
            callback('unable to connect location service!', undefined)
        }else if(body.features.length === 0){
            callback('no data available for the location '+address, undefined)
        }else {
            console.log("properties: ",body.features[0].properties)
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location: body.features[0].properties.place_name
            })
        }
    })
}

module.exports = geoCode;