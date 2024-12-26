const request= require('request')
const forecast = (lat, lng, callback)=>{
    const url='https://api.weatherstack.com/current?access_key=c0590996083f5d3382e3d3ff68904ede&query='+lat+','+lng+'&units=m'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(body.success== false){
            callback('Not the right co-ordinates',undefined)
        }
        else{
            callback(undefined,{
                location:body.location.name,
                temp: body.current.temperature,
                desc:body.current.weather_descriptions[0]
            })
               
        }

    })
}

module.exports={
    forecast: forecast
}
