const request = require('request')
const geocode=(address, callback)=>{
    const url='https://api.opencagedata.com/geocode/v1/json?q='+address+'&key=352a929aef3747a0840f75ead6f63680&limit=1'
    request({url, json: true}, (error,{body})=>{
        if(error){
            callback('Unable to connect properly!', undefined)
        }
        else if(body.results.length === 0){
            callback('Query is not right!',undefined)
        }
        else{
            callback(undefined,{
                lat: body.results[0].geometry.lat,
                long:body.results[0].geometry.lng,
                location: body.results[0].formatted
            }
        )
        }
    })
}
module.exports={
    geocode: geocode
}