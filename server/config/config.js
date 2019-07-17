process.env.PORT = process.env.PORT || 8000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
let urlDB=''
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/coffe'
}else{
    urlDB='mongodb+srv://thom:thom123@cluster0-izxry.mongodb.net/test?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB