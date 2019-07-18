//verificar token
require('../config/config')
const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    let token = req.get('Authorization') // leyendo el header que quiero buscar
    // res.json({
    //     token
    // })

    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if(err) return res.status(401).json({
            ok:false,
            err,
            message:'Token no valido'
        })
        req.userDB = decoded.userDB
        next()
    })

}

//verifica admin role

const verifyRole = (req,res,next)=>{

    let user = req.userDB
    if(user.role!=='ADMIN_ROLE') return res.status(401).json({
        ok:false,
        err,
        message:'No tiene permisos para ejecutar esta accion'
    })
    next()
}


module.exports = {
    verifyToken,
    verifyRole
}

// Los HTTP headers son la parte central de los HTTP requests y responses, y transmiten información acerca del navegador del cliente, 
// de la página solicitada, del servidor, etc.

// Headers. Son esquemas de key: value que contienen información sobre el HTTP request y el navegador. Aquí también se encuentran los 
// datos de las cookies. La mayoría de los headers son opcionales.

// Body. Si se envía información al servidor a través de POST o PUT, ésta va en el body.

//Fuente : https://diego.com.es/headers-del-protocolo-http