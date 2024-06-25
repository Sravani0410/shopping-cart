import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://shoppingcart:shoppingcart@cluster0.pir4n5b.mongodb.net/" || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as any);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
