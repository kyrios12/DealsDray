const express = require('express');
const port = 8080;
const db = require('./model/mongoose');
const router = require('./Routes/route');
const adminrouter = require('./Routes/admin_route');
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();


// Middlewares
app.use((req,res,next)=>{
    res.setHeader("Access-Controls-Allow-Origin","http://localhost:8080/api");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    )
    next();
})
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: false
}))

// Routes
app.use('/api',router);
app.use('/admin',adminrouter);

app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server is running on port: ${port}`);
    }
})
