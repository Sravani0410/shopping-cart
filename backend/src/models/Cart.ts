import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
    productId: typeof mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const CartSchema: Schema = new Schema({
    items: [CartItemSchema]
});

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
