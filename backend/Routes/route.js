const router = require('express').Router();
const db = require('../model/mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "$2a$10$lGNnw";

// Read Operation
router.get('/',async (req,res)=>{
    try{
       const data = await db.find();
       res.status(200).json({user: data});
    }catch(err){
      console.error("Error fetching data from db:",err);
      res.status(500).json({error:"Internal Server Error"})
    }
})
// Create Operation
// Encrypt pass using bcrypt and also use joi validator
router.post('/create',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const checkName = await db.findOne({username});
        if(checkName){
            return res.status(400).json({error: "Username already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await db.create({
            username: username,
            password : hashedPassword
        });

        res.status(201).json({message:"Registered Successfully",user: newUser});
    }catch(err){
        console.error("Not valid user:",err);
        res.status(500).json({error: "Internal Server Error"})
    }
})
// Login
// Check encrypted password
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.findOne({ username });

        if (user) {
            const comPassword = await bcrypt.compare(password, user.password);

            // Check if the provided password matches the stored password
            if (comPassword) {
                // Generate authentication token
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const authToken = jwt.sign(data, jwtSecret);

                // Respond with user data and authentication token
                res.status(200).json({ success: true, user: data.user, authToken });
                // res.json({success: true })
            } else {
                // If password doesn't match, respond with an error message
                res.status(401).json({ error: "Invalid username or password. Please try again or register." });
            }
        } else {
            // If username doesn't exist, respond with an error message
            res.status(404).json({ error: "User not found. Please register." });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});







module.exports = router;