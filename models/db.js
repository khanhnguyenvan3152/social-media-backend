const mongoose = require('mongoose')
const config = require('../config')

const uri = config.connectionString

module.exports = function(){
    mongoose.connect(uri).then(()=>{
        console.log('connected');
    })
}