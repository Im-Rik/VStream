const express = require('express');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {handleVideoFileUpload, handleVideoFetch} = require('../controllers/videos')

const router = express.Router();

router
.route('/upload')
.post(uploadMiddleware.single('video'), handleVideoFileUpload)

router
.route('/video/:id')
.get(handleVideoFetch)

module.exports = router;