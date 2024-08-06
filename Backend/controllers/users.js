const User = require('../models/user')
const {validateToken} = require('../utils/token')

const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const alreadyPresent = await User.findOne({ email: email });
        if (alreadyPresent) {
            throw new Error('User Already Exists');
        }
        await User.create({
            name: name,
            email: email,
            password: password
        });
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const handleUserSignIn = async (req, res) => {
   const {email, password} =  req.body;

    try{
        const token = await User.matchPasswordAndGenerateToken({email, password});
        // console.log(token);
        // return res.status(201).cookie("token", token);
        res.cookie("token", token, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
        return res.status(201).json({ message: token });
    }catch(e){
        return res.status(400).json({error: e.message})
    }
   
}

const handleVerifyUserToken = (req, res) => {
    const {token} = req.body;

    if(!token)  return res.status(400).json({ valid: false, message: 'No token provided' });

    try{
        const decoded = validateToken(token);
        return res.status(200).json({ valid: true, decoded: decoded });
    }catch(e){
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
}

module.exports = {
    handleUserSignUp, 
    handleUserSignIn,
    handleVerifyUserToken
}