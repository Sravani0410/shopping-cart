import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();

router.post('/products', addProduct);
router.get('/products', getProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
