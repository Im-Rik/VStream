const path = require('path');
const fs = require('fs/promises');
const execPromise = require('../utils/execPromise');
const ffmpeg = require('fluent-ffmpeg');

const processVideo = async (filePath) => {
  console.log(`Processing file ${filePath}`);

  const outputDir = `./public/videos/${path.basename(filePath, path.extname(filePath))}`;
  const fileName = path.basename(filePath, path.extname(filePath));

  try {
    await fs.mkdir(outputDir, { recursive: true });

    // Generating HLS video files and Thumbnail
    const hlsCommand = `ffmpeg -i ${filePath} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputDir}/${fileName}.m3u8`;
    const thumbnailCommand = `ffmpeg -i ${filePath} -ss 00:00:01.000 -vframes 1 ${outputDir}/thumbnail.jpg`;

    await execPromise(hlsCommand);
    console.log(`Video processed successfully`);

    await execPromise(thumbnailCommand);
    console.log(`Thumbnail generated successfully`);

    // Extract metadata using ffprobe
    const metadata = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, data) => {
        if (err) return reject(err);
        resolve({
          duration: data.format.duration,
          format: data.format.format_long_name,
        });
      });
    });

    // Construct URLs based on the output paths
    const videoLocationUrl = `/videos/${fileName}/${fileName}.m3u8`; 
    const thumbnailUrl = `/videos/${fileName}/thumbnail.jpg`;

    await fs.unlink(filePath);
    console.log(`Deleted file ${filePath}`);

    // Return metadata, URLs, and processing status
    return { 
      success: true, 
      metadata, 
      videoLocationUrl, 
      thumbnailUrl 
    };

  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    return { success: false, error: error.message }; //For Metadatas
  }
};

module.exports = {
  processVideo,
};
