import express from 'express';
import { getCart, addItemToCart, removeItemFromCart, updateItemQuantityInCart } from '../controllers/cartController';

const router = express.Router();

router.get('/cart', getCart);
router.post('/cart', addItemToCart);
router.delete('/cart/:productId', removeItemFromCart);
router.put('/cart/:productId', updateItemQuantityInCart);

export default router;
