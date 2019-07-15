# **RESTServer**

````sh

    > npm install
    > npm start

````

## **Observaciones**

````javascript

   const express = require('express'),
    app = express()

    app.get('/:id',(req,res)=>{
        res.send('me la pela')
    //params
        console.log(req.params) // esto es lo que hace retorna un objeto con los parametros que estamos enviando al servidor
    //query
        console.log(req.query) // query params ?

    })
    app.post('/',(req,res)=>{
    //body
        console.log(req.body)

    //query
    })
    app.listen(8000)
````
