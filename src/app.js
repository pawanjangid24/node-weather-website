const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./util/geoCode');
const forecast = require('./util/forecast');

const app = express();
const port = process.env.PORT || 3000;

const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars and the location
app.set('view engine', 'hbs');
app.set('views', viewPath);
//hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather-app',
        name: 'Pawan Jangid'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pawan Jangid'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is somehelpful text',
        name: 'Pawan Jangid'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'please provide address to search'
        })
    }
    
    geoCode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        console.log('response from server: ', latitude, longitude)
        
        if(error){
            return res.send({
                error
            })
        }else {
            forecast(latitude, longitude, (error, data) => {
                if(error){
                    return res.send({
                        error
                    })
                }

                console.log('data: ', data)
                res.send({
                    forecast: data,
                    location: location,
                    address: req.query.address
                })
            })
        }
        
    })
})

app.get('/help/*', (req, res) => {
    res.send()
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log('serveris listeinign on '+port)
})

