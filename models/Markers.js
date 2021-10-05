const mongoose = require('mongoose');

const markersSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: { //point, polyline, polygon
        type: String,
        required: true
    },
    coordinates: [
        {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
        }
    ],
    well_aggri:{
        type: Number,
        required: false,
        default: 0
    },
    well_depth:{
        type: Number,
        required: false,
        default: 0
    },
    well_industry:{
        type: Number,
        required: false,
        default: 0
    },
    farming_type:{
        type: String,
        required: false,
        default: 'none'
    },
    industry_type: {
        type: String,
        required: false,
        default: 'none'
    },
    rainfall: {
        type: Number,
        required: false,
        default: 0
    },
    landuse_type: {
        type: String,
        required: false,
        default: 'none'
    },
    livestock: {
        type: Number,
        required: false,
        default: 0
    },
    depth_waterbody: {
        type: Number,
        required: false,
        default: 0
    },
    remarks: {
        type: String,
        required: false,
        default: 'none'
    },
    water_quality: {
        type: String,
        required: false,
        default: 'none'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Markers', markersSchema);

