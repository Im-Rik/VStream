const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        require: true,
        type: String
    },
    email:{
        require: true,
        type: String,
        unique: true
    },
    password:{
        require: true,
        type: String
    },
    salt:{
        require: true,
        type: String
    },
    profilePhotoURL:{
        type: String,
        default: '/image/default.png'
    },
    role:{
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },

}, {timestamps: true});

userSchema.pre('save', function(next){
    const user = this;

    const salt = crypto.randomBytes(16).toString();
    const hashedPassword = crypto.createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();

});



const User = mongoose.model('user', userSchema);

module.exports = User;