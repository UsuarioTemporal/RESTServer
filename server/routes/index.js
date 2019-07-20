require('../config/config')
const express = require('express'),
    app = express()

app.use(require('./user'))
app.use(require('./login'))
app.use(require('./category'))

module.exports = app