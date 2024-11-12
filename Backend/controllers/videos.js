const Video = require('../models/video');
const {processVideo} = require('../services/videoProcessingService');

const handleVideoFileUpload = async (req, res) => {

    // console.log(req.body); // Logs form fields like title and description
    // console.log(req.file); // Logs file information
    
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // console.log("--------------")
    // console.log(req.body.title);
    // console.log(req.file.filename);
    // console.log("--------------")
    
    // res.status(200).send('File uploaded successfully');

    const {title, description, userId, name} = req.body;
    const {filename, path} = req.file;

    try{

      const { success, metadata, videoLocationUrl, thumbnailUrl, error } = await processVideo(path);
      if (!success) throw new Error("Error at this point");

      const publicationDate = new Date();
      

      await Video.create({
        title: title,
        description: description,
        videoFile: videoLocationUrl,
        thumbnail: thumbnailUrl,
        duration: metadata.duration,
        isPublished: publicationDate,
        owner: userId
      })

      res.status(201).json({message: 'Video Uploaded Successfully'})

    } catch(error){
      res.status(400).json({ error: error.message });
    }


};

const handleVideoFetch = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const video = await Video.findById(id).populate('owner', 'name');
    console.log(video);
    res.json(video); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching video' });
  }
}

  
module.exports = {
    handleVideoFileUpload,
    handleVideoFetch
}