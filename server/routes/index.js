const express = require('express'),
    app = express()

app.use(require('./user'))
app.use(require('./login'))

module.exports = app