const express = require('express');
const apiRoute = express.Router();

apiRoute.post('/add', (req, res) => {
    try {
        res.send(req.body);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
})

module.exports = apiRoute;