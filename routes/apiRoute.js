const express = require('express');
const apiRoute = express.Router();
const Markers = require('../models/Markers');

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d*1000;
}
  
function deg2rad(deg) {
return deg * (Math.PI/180)
}

apiRoute.post('/markers', async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        let marker = new Markers(data);
        let result = await marker.save();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
})

apiRoute.get('/markers', async (req, res) => {
    try {
        let query = Object.keys(req.query).length === 0 ? 'empty' : req.query;
        // console.log(query);
        let data = await Markers.find({});
        if (query === 'empty') {
            console.log('All data being sent!!!');
        } else {
            let lat1 = req.query.lat;
            let lng1 = req.query.lng;
            let dist = req.query.dist === undefined ? 500 : req.query.dist;
            // find nearest 500m latitudes longitudes
            // console.log(data.length);
            data = data.filter((item)=> {
                let distance = getDistanceFromLatLonInKm(lat1, lng1, item.coordinates[0].latitude, item.coordinates[0].longitude);
                // console.log(distance);
                return distance < dist;
            });
            // console.log(data.length);
            
        }
        res.send(data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
})

module.exports = apiRoute;