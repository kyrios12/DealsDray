const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/EmployDb").then(()=>{
    console.log(`Connected to Database`);
}).catch((err)=>{
    console.error(err);
})

// Login Schema
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        // required: true
    },
    password:{
        type: String,
        // required: true
    }
})




module.exports = mongoose.model('User',UserSchema);