const multer = require('multer');
const crypto = require('crypto')
const path = require('path');

const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_'); // Replace non-alphanumeric characters
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './bucket');
  },
  filename: function(req, file, cb) {
    const uniquePrefix = Date.now();
    const suffix = crypto.randomBytes(4).toString('hex');
    const sanitizedFileName = sanitizeFilename(file.originalname);
    cb(null, uniquePrefix + '-' + suffix + path.extname(sanitizedFileName));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
