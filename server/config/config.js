process.env.PORT = process.env.PORT || 1700

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB=' '

if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/coffe'
}else{
    urlDB='mongodb://localhost:27017/coffe'
}

process.env.URLDB = urlDB