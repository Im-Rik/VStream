const videoProcessingService = require('../services/videoProcessingService');

const handleVideoFileUpload = (req, res) => {
    //Due coding -- Update in DB
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    res.status(200).send('File uploaded successfully');
  };

module.exports = {
    handleVideoFileUpload,
}