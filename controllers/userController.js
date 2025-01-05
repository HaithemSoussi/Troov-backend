/**
 * @description Controller for user routes
 * @exports registerUser
 * @exports loginUser
 * @exports getProfile
 * @exports generateToken
 */
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**    
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * @description Register a new user
 * @route POST /register
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Already existing user' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @description Login a user
 * @route POST /login
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid identifiers' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @description Get the profile information of the logged in user
 * @route GET /profile
 */
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password'); // Exclure le mot de passe
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

/**
 * @description Generate a JSON Web Token
 * @route POST /login
 * @param {string} id
 * @returns {string} token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export { registerUser, loginUser, getProfile };
