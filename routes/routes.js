/**
 * @api {get} /api/users/ Request User information
 * @apiName GetUser
 * @apiGroup User
 */
import express from 'express';

const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  getProfile,
} from '../controllers/userController.js';
import {
  getProductsByUser,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

/**
 * @description test route
 * @route /api/users
 */
router.get('/', (req, res) => {
  res.send('Test Routes');
});

/**
 * @description Routes Api
 * @route /api/users/register
 * @route /api/users/login
 * @route /api/users/profile
 * @route /api/users/products
 * @route /api/users/products/:id
 */

// Route pour l'enregistrement d'un utilisateur
router.post('/register', registerUser);

// Route pour la connexion d'un utilisateur
router.post('/login', loginUser);

// Route pour obtenir les informations de profil d'un utilisateur connecté
router.get('/profile', protect, getProfile);

// Routes pour les produits
router.get('/products', protect, getProductsByUser);

// Route pour obtenir un produit par son ID
router.get('/products/:id', getProductById);

// Route pour ajouter un produit
router.post('/products', protect, addProduct);

// Route pour mettre à jour un produit
router.patch('/products/:id', protect, updateProduct);

// Route pour supprimer un produit
router.delete('/products/:id', protect, deleteProduct);

export default router;
