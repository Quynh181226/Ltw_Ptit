import express from 'express';
import pool from '../config/db';
import type { Test, Question, Answer } from '../types/type';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT t.*, c.name as categoryName
            FROM tests t
                     LEFT JOIN categories c ON t.categoryId = c.id
        `);
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [testRows] = await pool.query('SELECT * FROM tests WHERE id = ?', [id]);
        if ((testRows as any[]).length === 0) {
            return res.status(404).json({ error: 'Test not found' });
        }

        const test = (testRows as any[])[0] as Test;
        const [quesRows] = await pool.query('SELECT * FROM questions WHERE testId = ?', [id]);

        let quesDetail: Question[] = [];
        if ((quesRows as any[]).length > 0) {
            const questionIds = (quesRows as any[]).map((q: any) => q.id);
            const placeholders = questionIds.map(() => '?').join(',');
            const [ansRows] = await pool.query(
                `SELECT * FROM answers WHERE questionId IN (${placeholders})`,
                questionIds
            );

            quesDetail = (quesRows as any[]).map((q: any) => ({
                ...q,
                answers: (ansRows as any[]).filter((a: any) => a.questionId === q.id)
            }));
        }

        res.json({ ...test, quesDetail });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { title, categoryId, duration, quesCnt } = req.body;
    if (!title || !duration || !quesCnt) {
        return res.status(400).json({ error: 'title, duration, quesCnt required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO tests (title, categoryId, duration, quesCnt, plays) VALUES (?, ?, ?, ?, 0)',
            [title, categoryId || null, duration, quesCnt]
        );
        const insertId = (result as any).insertId;
        res.status(201).json({ id: insertId, title, categoryId, duration, quesCnt, plays: 0 });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, categoryId, duration, quesCnt, quesDetail } = req.body;

    if (!title || !duration || !quesCnt || !Array.isArray(quesDetail)) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        await pool.query('START TRANSACTION');

        await pool.query(
            'UPDATE tests SET title = ?, categoryId = ?, duration = ?, quesCnt = ? WHERE id = ?',
            [title, categoryId || null, duration, quesCnt, id]
        );

        await pool.query('DELETE FROM answers WHERE questionId IN (SELECT id FROM questions WHERE testId = ?)', [id]);
        await pool.query('DELETE FROM questions WHERE testId = ?', [id]);

        for (const q of quesDetail) {
            const [qRes] = await pool.query(
                'INSERT INTO questions (testId, question) VALUES (?, ?)',
                [id, q.question]
            );
            const qId = (qRes as any).insertId;

            for (const a of q.answers || []) {
                await pool.query(
                    'INSERT INTO answers (questionId, text, correct) VALUES (?, ?, ?)',
                    [qId, a.text, a.correct]
                );
            }
        }

        await pool.query('COMMIT');
        res.json({ id: parseInt(id), title, categoryId, duration, quesCnt, quesDetail });
    } catch (err: any) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('START TRANSACTION');
        await pool.query('DELETE FROM answers WHERE questionId IN (SELECT id FROM questions WHERE testId = ?)', [id]);
        await pool.query('DELETE FROM questions WHERE testId = ?', [id]);
        await pool.query('DELETE FROM tests WHERE id = ?', [id]);
        await pool.query('COMMIT');
        res.json({ message: 'Deleted' });
    } catch (err: any) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { plays } = req.body;
    try {
        await pool.query('UPDATE tests SET plays = plays + ? WHERE id = ?', [plays || 1, id]);
        const [rows] = await pool.query('SELECT plays FROM tests WHERE id = ?', [id]);
        res.json({ plays: (rows as any[])[0].plays });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;