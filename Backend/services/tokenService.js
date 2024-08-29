const jwt = require('jsonwebtoken');

const secret = '$@%@'

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhotoURL: user.profilePhotoURL,
        role: user.role

    };

    const token = jwt.sign(payload, secret);
    return token;
}

const validateToken = (token) =>{
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}