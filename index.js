const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' })

const app = express();

const URL = process.env.MONGODB_URI.toString();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Everything seems fine! You just landed the homepage of UBA Data API!!!');
})

app.use('/api', require('./routes/apiRoute'));


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch(err => {console.error(err)});