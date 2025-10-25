import express from 'express';
import pool from '../config/db';
import type { User } from '../types/type';

const router = express.Router();

router.get('/', async (req, res) => {
    const { email } = req.query;
    try {
        let query = 'SELECT id, fullName, email, password, role, active, inactive, suspended, loginAttempts, lockUntil, waiting, avatar, phone, gender, DATE_FORMAT(birthDate, "%Y-%m-%d") as birthDate, class FROM users';
        let params: any[] = [];
        if (email) {
            query += ' WHERE email = ?';
            params = [email];
        }
        const [rows] = await pool.query(query, params);
        res.json(rows as User[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT id, fullName, email, password, role, active, inactive, suspended, loginAttempts, lockUntil, waiting, avatar, phone, gender, DATE_FORMAT(birthDate, "%Y-%m-%d") as birthDate, class FROM users WHERE id = ?',
            [id]
        );
        const user = (rows as any[])[0];
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const user = req.body;


    if (user.birthDate) {
        const date = new Date(user.birthDate);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: "Invalid birthDate format" });
        }
        user.birthDate = date.toISOString().split('T')[0];
    }


    try {
        const [result] = await pool.query('INSERT INTO users SET ?', user);
        res.json({ ...user, id: (result as any).insertId });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(id);

    try {
        await pool.query(`UPDATE users SET ${fields} WHERE id = ?`, values);
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json((rows as any[])[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'Deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;