const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

// console.log(path.join(__dirname, "../public"))
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        name: 'MK',
        age: 23,
        title: "Index"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: "MK",
        title: "Help"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "MK",
        title: "About"
    })
})

app.get('/weather', (req, res) => {
    // res.send({
    //     key: 'This Is Weather Page',
    //     address: req.query.address
    // })

    if(!req.query.location){
        return res.render('weather', {
            title: 'Weather',
            name: 'MK',
            error: 'Please Provide The Location'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.render('weather', {
            title: 'Weather',
            name: 'MK',
            error
            }) 
        }
        forcast(latitude, longitude, (error, {weather, temperature, rainPossibility} = {}) => {
            if(error){
                if(error){
                    return res.render('weather', {
                     title: 'Weather',
                     name: 'MK',
                     error
                     })
                }
            }
            res.render('weather', {
                title: 'Weather',
                name: 'MK',
                latitude,
                longitude,
                location,
                weather,
                temperature,
                rainPossibility,
                address: req.query.location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(8000, () => {
    console.log('App Is Listening 8000 Port.')
})