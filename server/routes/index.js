require('../config/config')
const express = require('express'),
    app = express()

app.use(require('./user'))
app.use(require('./login'))
app.use(require('./category'))
app.use(require('./product'))
app.use(require('./upload'))

module.exports = app