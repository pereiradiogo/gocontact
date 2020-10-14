const express = require('express')
const axios = require('axios')
const moment = require('moment')

var router = express.Router()

router.get('/:cities', async function (req, res) {
    if(!req.params.cities) {
        res.send({code: 404, message: 'no_cities_found'})
        return
    }
    let cities = req.params.cities.split(',')

    if(cities.length < 3) {
        res.send({code: 404, message: 'insert_more_cities'})
        return
    }

    let citiesData = []
    for (const city of cities) {
        try {
            let result = await axios.get(process.env.OPENWEATHER_URL + '?units=metric&q='+city+'&appid=' + process.env.OPENWEATHER_APIKEY)
            if(result.data) {
                citiesData.push({
                    city: result.data.name,
                    temp: result.data.main.temp,
                    sunrise: new moment.unix(result.data.sys.sunrise).utc('+1').format('HH:mm:ss'),
                    sunset: new moment.unix(result.data.sys.sunset).utc('+1').format('HH:mm:ss'),
                })
            }
        } catch (error) {
            res.send({code: 500, message: error.message})
            return
        }
    }

    res.send({code: 200, items: citiesData})
})

module.exports = router