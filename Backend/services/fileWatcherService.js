const chokidar = require('chokidar');
const {processVideo} = require('./videoProcessingService');
const asyncQueue = require('async/queue');
const fs = require('fs/promises');

const videoQueue = asyncQueue(async (filePath, callback) => {
  await processVideo(filePath);
  callback();
}, 1);

const waitForCompleteUpload = (filePath, callback) => {
  let lastSize = 0;
  const checkInterval = setInterval(async () => {
    try {
      const stats = await fs.stat(filePath);
      if (stats.size === lastSize) {
        clearInterval(checkInterval);
        callback(filePath);
      } else {
        lastSize = stats.size;
      }
    } catch (err) {
      //console.error(`Error checking file size: ${err.message}`);
      clearInterval(checkInterval);
    }
  }, 2000);
};

const watchFiles = () => {
  const watcher = chokidar.watch('bucket', { persistent: true });

  watcher.on('add', (filePath) => {
    //console.log(`File ${filePath} has been added`);
    waitForCompleteUpload(filePath, (completeFilePath) => {
      videoQueue.push(completeFilePath);
    });
  });
};

module.exports = {
  watchFiles,
};
