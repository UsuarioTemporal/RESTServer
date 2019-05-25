const express = require('express'),
    port = require('./config/config'),
    app = express()


app.use(express.urlencoded({extended:false}))
.use(express.json())
