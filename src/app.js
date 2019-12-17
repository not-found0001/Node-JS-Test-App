const express = require('express')
const path = require('path')
const hbs = require('hbs')

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

app.get('*', (req, res) => {
    res.send("404 Not Found")
})

app.listen(8000, () => {
    console.log('App Is Listening 8000 Port.')
})