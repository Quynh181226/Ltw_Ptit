import express from 'express';
import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute<RowDataPacket[]>(`
            SELECT id, user_id, user_name, user_avatar, rating, comment, created_at
            FROM feedback
            ORDER BY created_at DESC
        `);

        const formattedRows = rows.map((row: any) => ({
            ...row,
            user_id: row.user_id ? Number(row.user_id) : null
        }));

        res.json(formattedRows);
    } catch (error) {
        console.error('Get feedback error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { user_id, user_name, user_avatar, rating, comment } = req.body;

        if (!user_name || !rating || !comment) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userId = user_id ? Number(user_id) : null;

        const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO feedback (user_id, user_name, user_avatar, rating, comment)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, user_name, user_avatar || null, rating, comment]
        );

        res.status(201).json({
            message: 'Feedback submitted successfully',
            id: result.insertId
        });
    } catch (error) {
        console.error('Submit feedback error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;