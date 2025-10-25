import express from 'express';
import pool from '../config/db';
import type { Category } from '../types/type';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows as Category[]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, image } = req.body;
    if (!name || !image) return res.status(400).json({ error: 'name and image required' });

    try {
        const [result] = await pool.query(
            'INSERT INTO categories (name, image) VALUES (?, ?)',
            [name, image]
        );
        const insertId = (result as any).insertId;
        res.status(201).json({ id: insertId, name, image } as Category);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;
    if (!name || !image) return res.status(400).json({ error: 'name and image required' });

    try {
        await pool.query(
            'UPDATE categories SET name = ?, image = ? WHERE id = ?',
            [name, image, id]
        );
        res.json({ id: parseInt(id), name, image } as Category);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM categories WHERE id = ?', [id]);
        res.json({ message: 'Deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;