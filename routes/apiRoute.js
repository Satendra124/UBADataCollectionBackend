const express = require('express');
const apiRoute = express.Router();
const Markers = require('../models/Markers');

apiRoute.post('/addMarker', async (req, res) => {
    try {
        let data = req.body;
        let marker = new Markers(data);
        let result = await marker.save();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
})

apiRoute.get('/allMarkers', async (req, res) => {
    try {
        let data = await Markers.find({});
        res.send(data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
})

module.exports = apiRoute;