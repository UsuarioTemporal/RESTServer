const express = require('express'),
    app = express()
app.get('/',(req,res)=>{
    res.json({
        name:'Thom'
    })
})

module.exports=app