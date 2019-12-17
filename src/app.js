const express = require('express')
const path = require('path')
const app = express()

// console.log(path.join(__dirname, "../public"))
const publicDirectoryPath = path.join(__dirname, "../public")
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send({
        name: 'MK',
        age: 23
    })
})

app.get('/help', (req, res) => {
    res.send({
        name: "MK"
    })
})

app.get('/about', (req, res) => {
    res.send({
        name: "MK"
    })
})

app.get('*', (req, res) => {
    res.send("404 Not Found")
})

app.listen(8000, () => {
    console.log('App Is Listening 8000 Port.')
})