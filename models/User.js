/**
 * @module User
 * @description User model for MongoDB
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * @type {mongoose.Schema}
 * @description User schema for MongoDB
 * @property {String} name - The user name
 * @property {String} email - The user email
 * @property {String} password - The user password
 * @property {Date} createdAt - The creation date
 * @property {Date} updatedAt - The update date
 */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
  },
  {
    timestamps: true,
  },
);

// Middleware pour hacher le mot de passe
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
