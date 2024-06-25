import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Cart, ICart, ICartItem } from '../models/Cart';
import { Product } from '../models/Product';

export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const addItemToCart = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        const existingItem = cart.items.find((item: ICartItem) => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId: new mongoose.Types.ObjectId(productId),
                name: product.name,
                price: product.price * quantity,
                description: product.description,
                quantity
            } as ICartItem);
        }

        const savedCart = await cart.save();
        res.status(201).json({
            items: savedCart.items.map((item: ICartItem) => ({
                id: item.productId,
                name: item.name,
                price: item.price,
                description: item.description,
                quantity: item.quantity
            }))
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




export const removeItemFromCart = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter((item: ICartItem) => item.productId.toString() !== productId);
        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        const savedCart = await cart.save();
        res.json(savedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateItemQuantityInCart = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemToUpdate = cart.items.find((item: ICartItem) => item.productId.toString() === productId);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
            const savedCart = await cart.save();
            return res.json(savedCart);
        }

        res.status(404).json({ message: 'Item not found in cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
