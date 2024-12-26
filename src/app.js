const path= require('path')
const express = require('express')
const request = require('postman-request');
const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs= require('hbs')
const { send } = require('process')
const app=express()

console.log(__dirname)
const publicpath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.use(express.static(publicpath))

app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Aish'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Aish'
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather-app',
        name: 'AISH'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send( {
            error:"Address is required"
        })
    }

    const loc = req.query.address
    console.log(req.query.address)
    geocode.geocode(loc, (error,{lat,long,location}={})=>{
        if(error){
            return res.send({error})
        }
        console.log(lat)
        console.log(long)
        forecast.forecast(lat,long,(error, data) => {
            if(error){
               return res.send({error})
            }

            res.send({
                forecast:data,
                location,
             
            })
          })
    })
})



app.get('*',(req,res)=>{
    res.render('404page',{
        Wrong: 'Not working'
    })
})

app.get('/help/*',(req,res)=>[
    res.render('404page',{
        Wrong: 'Not working'
    })
])


app.listen(3000,()=>{
    console.log('Server is running!')
})