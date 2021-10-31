const path = require("path");
const {Router, request, response} = require("express");
const multer = require("multer");
const imageProcessor = require('./imageProcessor');

const photoPath = path.resolve(__dirname, "../../client/photo-viewer.html")
const storage = multer.diskStorage(
    {
        destination: 'api/uploads/',
        filename: filename
    });
const router = Router();
const upload = multer(
    {
        fileFilter: fileFilter,
        storage: storage
    });

router.post('/upload', upload.single('photo'), async (request, response) => {
    if (request.fileValidationError) {
        response.status(400).json({error: request.fileValidationError});
    } else {
        try {
            await imageProcessor(request.file.filename);
            response.status(201).json({success: true});
        } catch (error) {
            response.status(400).json({error: error});
        }    
    }
});

router.get('/photo-viewer', (request, response) => {
    response.sendFile(photoPath);
});
    
function filename(request, file, callback) {
    callback(null, file.originalname);
}

function fileFilter(request, file, callback) {
    if (file.mimetype != 'image/png') {
        request.fileValidationError = "Wrong file type";
        callback(null, false, new Error(message="Wrong file type"));
    } else {
        callback(null, true);
    }
}

module.exports = router;