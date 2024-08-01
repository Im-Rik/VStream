const User = require('../models/user')

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


const handleUserSignIn = (req, res) => {
    res.send("ok")
}

module.exports = {
    handleUserSignUp, 
    handleUserSignIn
}