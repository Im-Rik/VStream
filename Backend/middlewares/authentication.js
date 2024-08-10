const {validateToken} = require('../utils/token')

const checkForAuthenticationCookie = (cookieName) => {

    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) return next();

        const userPayload = validateToken(tokenCookieValue);
        req.user = userPayload;
        next();
    }
    
}

module.exports = checkForAuthenticationCookie;