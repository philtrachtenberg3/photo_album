const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// create a new route that reads the image files from your directory and sends a list of image filenames to the client
app.get('/images', (req, res) => {
    const imageDir = path.join(__dirname, 'public/images');

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(files);
        }
    });
});

app.post('/upload', upload.single('image'), (req, res) => {
    const imageInfo = {
        title: req.body.title,
        caption: req.body.caption,
        filename: req.file.filename // The filename multer saved the image as
    };
