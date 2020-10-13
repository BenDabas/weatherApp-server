const path = require('path');
const express = require('express');
const { dirname } = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars angine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve . app.get find match with the directory in app.use
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        // recognize that index is index.hbs
        title: 'Weather App', // send an object to index.hbs
        name: 'Ben Dabas',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About My',
        name: 'Ben Dabas',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is helpful text',
        name: 'Ben Dabas',
    });
});

// app.get('/help', (req, res) => {
//     res.send({
//         // the browser JSON stringify the object
//         name: 'Ben',
//         age: '24',
//     });
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>'); // display on browser
// });

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        // req.query its is the query from the url
        return res.send({
            error: 'You must provide an address !',
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        // when error happened , the second argument is undefined , and we trying to distrusting  from undefined and error happened so we default = {}

        if (error) {
            return res.send({
                error,
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            res.send({
                location,
                forecastData,
                address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: ' 404',
        name: 'Ben Dabas',
        errorMessage: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: ' 404',
        name: 'Ben Dabas',
        errorMessage: 'Page not found',
    });
});
// app.get('*', (req, res) => {
//     res.send('My 404 page');
// });

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
