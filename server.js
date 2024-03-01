const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Endpoint to list images
app.get('/images', (req, res) => {
    const imageDir = path.join(__dirname, 'public/images');

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            res.status(500).send('Internal Server Error');
        } else {
            // Assuming you want to send back JSON objects with filename, title, and caption
            const imagesInfoPath = path.join(__dirname, 'imageData.json');
            if (fs.existsSync(imagesInfoPath)) {
                const imagesInfo = JSON.parse(fs.readFileSync(imagesInfoPath));
                res.json(imagesInfo);
            } else {
                res.json([]); // Send an empty array if no imageData.json file exists
            }
        }
    });
});

// Endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
    const imageInfo = {
        title: req.body.title,
        caption: req.body.caption,
        filename: req.file.filename // The filename multer saved the image as
    };

    // Save this info into a JSON file (consider a database for production use)
    const dbFilePath = path.join(__dirname, 'imageData.json');
    let imageData = [];
    if (fs.existsSync(dbFilePath)) {
        imageData = JSON.parse(fs.readFileSync(dbFilePath));
    }
    imageData.push(imageInfo);
    fs.writeFileSync(dbFilePath, JSON.stringify(imageData));

    res.json({ message: 'File uploaded successfully', file: req.file.filename });
});
