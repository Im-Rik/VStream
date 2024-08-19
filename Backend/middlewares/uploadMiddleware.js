const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './bucket');
  },
  filename: function(req, file, cb) {
    const uniquePrefix = Date.now();
    const suffix = crypto.randomBytes(4).toString();
    cb(null, uniquePrefix + '-' + suffix);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
