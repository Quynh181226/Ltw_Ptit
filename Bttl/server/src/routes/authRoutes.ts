import express from 'express';
import pool from '../config/db';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Err email or password' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = (rows as any[])[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                phone: user.phone,
                gender: user.gender,
                birthDate: user.birthDate,
                class: user.class
            }
        });
    } catch (err: any) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

export default router;