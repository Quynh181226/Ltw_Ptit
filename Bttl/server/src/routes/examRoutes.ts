import express from 'express'
import pool from '../config/db'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const [exams] = await pool.query<any[]>('SELECT * FROM exams')

        const result = await Promise.all(
            exams.map(async (exam) => {
                const [questions] = await pool.query<any[]>('SELECT * FROM exam_questions WHERE examId = ?', [exam.id])
                return { ...exam, questions }
            })
        )

        res.json(result)
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: 'Không thể lấy danh sách bài thi' })
    }
})

router.post('/', async (req, res) => {
    const { title, status = false } = req.body
    if (!title) return res.status(400).json({ error: 'Title là bắt buộc' })

    try {
        const [result] = await pool.query<any>(
            'INSERT INTO exams (title, status, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
            [title, status]
        )

        res.json({
            id: result.insertId,
            title,
            status,
            createdAt: new Date().toISOString()
        })
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: 'Không thể thêm bài thi' })
    }
})

router.post('/:id/questions', async (req, res) => {
    const { id } = req.params
    const { name, time, test1, test2, test3 } = req.body
    if (!name || !time) return res.status(400).json({ error: 'Name và time là bắt buộc' })

    try {
        const [exam] = await pool.query<any[]>('SELECT id FROM exams WHERE id = ?', [id])
        if (!exam.length) return res.status(404).json({ error: 'Bài thi không tồn tại' })

        const [result] = await pool.query<any>(
            'INSERT INTO exam_questions (examId, name, time, test1, test2, test3) VALUES (?, ?, ?, ?, ?, ?)',
            [
                id,
                name,
                time,
                test1 ? JSON.stringify(test1) : null,
                test2 ? JSON.stringify(test2) : null,
                test3 ? JSON.stringify(test3) : null
            ]
        )

        res.json({
            id: result.insertId,
            examId: Number(id),
            name,
            time
        })
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: 'Không thể thêm câu hỏi' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await pool.query('DELETE FROM exam_questions WHERE examId = ?', [id])

        const [result] = await pool.query<any>('DELETE FROM exams WHERE id = ?', [id])
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Bài thi không tồn tại' })

        res.json({ message: 'Xóa bài thi thành công' })
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: 'Không thể xóa bài thi' })
    }
})

export default router
