process.env.PORT = process.env.PORT || 1700

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB='mongodb://localhost:27017/coffe'

if(process.env.NODE_ENV!=='dev'){
    urlDB=process.env.MONGO_URI
}

// vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//seed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo-el-de-produccion-nunca-lo-veras-prro-xd' 

process.env.URLDB = urlDB