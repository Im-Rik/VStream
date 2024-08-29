const {validateToken} = require('../services/tokenService')

const checkForAuthenticationCookie = (cookieName) => {

    return (req, res, next) => {

        if(!req.cookies) return next();

        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) return next();

        const userPayload = validateToken(tokenCookieValue);
        req.user = userPayload;
        next();
    }
    
}

module.exports = checkForAuthenticationCookie;