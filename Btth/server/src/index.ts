import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db';
import categoryRoutes from './routes/categoryRoutes';
import testRoutes from './routes/testRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Quiz API Running!' });
});

pool.getConnection()
    .then(conn => {
        console.log('MySQL Connected');
        conn.release();
    })
    .catch(err => console.error('DB Error:', err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});