const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getData = require('./utils/getData');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'sahilsingh'
    });
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'ABOUT us page',
        para: 'this is dynamic page by me',
        name: 'sahilsingh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help you!',
        name: 'sahilsingh'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address'
        })
    }

    getData(req.query.address, (error, { name, country, region } = {}, { temperature, weather_descriptions } = {}) => {
        if (error) {
            res.send({
                error: error
            })
        }
        else {
            res.send({
                address: req.query.address,
                location: `${name}, ${region}, ${country}`,
                Forecasting: weather_descriptions[0],
                temperature
            });
        }
    })


})

app.get('/products', (req, res) => {
    if (!req.query.catogory) {
        return res.send({
            error: 'first provide query for search'
        })
    }
    res.send({
        id: 1,
        name: 'pro1'
    })
});


app.get('/help/*', (req, res) => {
    res.render('error', {
        msg: "Help article page not found",
        title: 'OOPs  page not found',
        name: 'sahilsingh'
    });
})



app.get('*', (req, res) => {
    res.render('error', {
        msg: "404 page not found",
        title: 'OOPs  page not found',
        name: 'sahilsingh'
    });
})

app.listen(3000, () => {
    console.log('Listning to the port 3000');
})


