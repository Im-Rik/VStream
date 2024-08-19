const express = require('express');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {handleVideoFileUpload} = require('../controllers/videos')

const router = express.Router();

router
.route('/upload')
.post(uploadMiddleware.single('video'), handleVideoFileUpload)



module.exports = router;