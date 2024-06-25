import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

export interface ICart extends Document {
    items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const CartSchema: Schema = new Schema({
    items: [CartItemSchema]
});

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
