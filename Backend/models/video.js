const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    videoFile: {
      type: String,  
      required: true
    },
    thumbnail: {
      type: String, 
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Date,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

}, {timestamps: true})


const Video = mongoose.model('video', videoSchema);

module.exports = Video;