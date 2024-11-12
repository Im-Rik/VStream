const Videos = require('../models/video');

const handleLoadingHomePage = async (req, res) => {
  try {
    const allVideos = await Videos.find({}).populate('owner', 'name'); // Only populate the name field
    res.send({ allVideos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Error fetching videos" });
  }
};

module.exports = {
  handleLoadingHomePage
}; 
