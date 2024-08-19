const path = require('path');
const fs = require('fs/promises');
const execPromise = require('../utils/execPromise');

const processVideo = async (filePath) => {
  console.log(`Processing file ${filePath}`);

  const outputDir = `./public/videos/${path.basename(filePath, path.extname(filePath))}`;
  const fileName = path.basename(filePath, path.extname(filePath));

  try {
    await fs.mkdir(outputDir, { recursive: true });

    const hlsCommand = `ffmpeg -i ${filePath} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputDir}/${fileName}.m3u8`;
    const thumbnailCommand = `ffmpeg -i ${filePath} -ss 00:00:01.000 -vframes 1 ${outputDir}/thumbnail.jpg`;

    await execPromise(hlsCommand);
    console.log(`Video processed successfully`);

    await execPromise(thumbnailCommand);
    console.log(`Thumbnail generated successfully`);

    await fs.unlink(filePath);
    console.log(`Deleted file ${filePath}`);
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
  }
};

module.exports = {
  processVideo,
};
