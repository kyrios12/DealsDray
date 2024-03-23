const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/EmployDb').then(()=>{
    console.log(`Connected to db`);
}).catch((err)=>{
    console.error(err);
})


const EmployeeSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type:String
    },
    mobile:{
        type: Number
    },
    designation:{
        type:String
    },
    gender:{
        type:String
    },
    course:{
        type:[String]
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('Employee',EmployeeSchema);