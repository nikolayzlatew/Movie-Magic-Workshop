const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const SECRET = 'fsad6fds6fds66fds6fsad6dsf6adsf6';

// TODO: Check if user exits
exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email });

    // Check if user exist
    if (!user) {
        throw new Error('Cannot find username or password');
    }

    // Check if password is valid

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find username or password')
    }

    // Generate jwt token
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' })

    // return token

    return token;
}