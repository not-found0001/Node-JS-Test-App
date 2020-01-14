const request = require('request')



const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + darkSkyAPIKey + 
                '/' + latitude + ',' + longitude + '?'
    request({url, json:true}, (error, response) => {
        if(error){
            callback('Unable To Connect Weather Service')
        }
        else if(response.body.error){
            callback('Location Not Found')
        }
        else{
            callback('', {
                weather: response.body.currently.summary,
                temperature: response.body.currently.temperature,
                rainPossibility: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forcast