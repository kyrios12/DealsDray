const router = require('express').Router();
const multer = require('multer');
const employee = require('../model/employeelist');
const path = require('path');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const data = await employee.find();
        res.status(200).json({ users: data });
    } catch (err) {
        console.error("Error fetching data from db:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Finding element by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Access the 'id' parameter from req.params
        const userExist = await employee.findById(id);
        if (userExist) {
            res.status(200).json({ user: userExist });
        } else {
            res.status(404).json({ error: "User not found" }); // Change status code to 404 for resource not found
        }
    } catch (err) {
        console.error("Error fetching data from db:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        // const { name, email, mobile, designation, gender } = req.body;
        if (!req.body.name || !req.body.email || !req.body.mobile || !req.body.designation || !req.body.gender) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const checkName = await employee.findOne({ name:req.body.name });
        if (checkName) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const newUser = await employee.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            designation: req.body.designation,
            gender: req.body.gender,
            course: req.body.course || [],
            img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fuser-png-icon-big-image-png-2240.png&f=1&nofb=1&ipt=3ef314ac8b7a8d954c357d2eb8a6abf4a6f6b270dd9b7affdc8f5916ace84631&ipo=images" // Check if req.file exists before accessing its properties
        });

        res.status(201).json({ message: "Registered Successfully", user: newUser });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Assuming you are using Mongoose
        const existUser = await employee.findByIdAndDelete(id);
        if (existUser) {
            res.status(200).json({ message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ error: 'Data not found' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'An error occurred while deleting data' });
    }
});
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existUser = await employee.findById(id);

        if (existUser) {
            // If the user exists, update the user data with the provided data
            const updatedUser = await employee.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'An error occurred while updating data' });
    }
});



module.exports = router;
