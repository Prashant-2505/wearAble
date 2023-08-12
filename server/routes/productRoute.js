import express from 'express';
import formidable from 'express-formidable'
import { createProductController, deleteProductController, getPhotoController, getProductController, getSingleProductController, updateProductController } from '../controller/productController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// create product
router.post('/create-product', formidable(),createProductController)
// get product 
router.get('/get-product',getProductController)
// get single product
router.get('/single-product/:slug',getSingleProductController)
// get photo
router.get('/get-photo/:pid',getPhotoController)
// delete product
router.delete('/delete-product',deleteProductController)
// update product
router.put('/update-product',updateProductController)
export default router;
