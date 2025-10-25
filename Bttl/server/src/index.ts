import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db';
import categoryRoutes from './routes/categoryRoutes';
import testRoutes from './routes/testRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import examRoutes from './routes/examRoutes';
// import topicRoutes from './routes/topicRoutes';
import feedbackRoutes from './routes/feedbackRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);
// app.use('/api/topics', topicRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Quiz API Running!' });
});

const connectWithRetry = async (retries = 5, delay = 5000) => {
    while (retries) {
        try {
            const conn = await pool.getConnection();
            console.log('MySQL Connected');
            conn.release();
            return;
        } catch (err) {
            console.error('DB Error:', err);
            retries -= 1;
            if (retries === 0) throw new Error('Failed to connect to DB');
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

connectWithRetry().catch(err => {
    console.error('DB Connection Failed:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});