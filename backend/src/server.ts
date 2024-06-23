import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8087;

app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
