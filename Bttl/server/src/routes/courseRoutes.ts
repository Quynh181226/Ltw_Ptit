import express from 'express'
import pool from '../config/db'
import type { Course, Lesson } from '../types/type'

const router = express.Router()

// Lấy tất cả khóa học
//Nếu lm nvay se ko the lay dc less vi....
// router.get('/', async (req, res) => {
//     try {
//         const [rows] = await pool.query<any[]>('SELECT * FROM courses')
//         res.json(rows)
//     } catch {
//         res.status(500).json({ error: 'Không thể lấy danh sách khóa học' })
//     }
// })

router.get('/', async (req, res) => {
    try {
        const [courseRows] = await pool.query<any[]>(
            'SELECT id, title, numberLessons, status, createdAt FROM courses'
        );

        const coursesWithLessons = await Promise.all(
            courseRows.map(async (course) => {
                const [lessons] = await pool.query<any[]>(
                    'SELECT id, courseId, name, time FROM lessons WHERE courseId = ?',
                    [course.id]
                );

                const lessonsWithContents = await Promise.all(
                    lessons.map(async (lesson) => {
                        const [contents] = await pool.query<any[]>(
                            'SELECT id, lesson_id, type, data, display_order FROM lesson_contents WHERE lesson_id = ?',
                            [lesson.id]
                        );
                        return { ...lesson, contents };
                    })
                );

                return { ...course, lessons: lessonsWithContents };
            })
        );

        res.json(coursesWithLessons);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const [courses] = await pool.query<any[]>('SELECT * FROM courses WHERE id = ?', [id])
        if (!courses.length) return res.status(404).json({ error: 'Khóa học không tồn tại' })

        const [lessons] = await pool.query<any[]>('SELECT * FROM lessons WHERE courseId = ?', [id])
        res.json({ ...courses[0], lessons })
    } catch {
        res.status(500).json({ error: 'Không thể lấy thông tin khóa học' })
    }
})

router.post('/', async (req, res) => {
    const { title, lessons = [], numberLessons = 0, status = false }: Omit<Course, 'id' | 'createdAt'> = req.body
    if (!title) return res.status(400).json({ error: 'Title là bắt buộc' })

    try {
        const [result] = await pool.query<any>(
            'INSERT INTO courses (title, lessons, numberLessons, status, createdAt) VALUES (?, ?, ?, ?, NOW())',
            [title, JSON.stringify(lessons), numberLessons, status]
        )
        res.json({
            id: result.insertId,
            title,
            lessons,
            numberLessons,
            status,
            createdAt: new Date().toISOString()
        })
    } catch {
        res.status(500).json({ error: 'Không thể thêm khóa học' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, lessons, numberLessons, status } = req.body

    if (!title) return res.status(400).json({ error: 'Title là bắt buộc' })

    try {
        const [result] = await pool.query<any>(
            'UPDATE courses SET title=?, lessons=?, numberLessons=?, status=? WHERE id=?',
            [title, JSON.stringify(lessons), numberLessons, status, id]
        )
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Khóa học không tồn tại' })
        res.json({ id: Number(id), title, lessons, numberLessons, status })
    } catch {
        res.status(500).json({ error: 'Không thể cập nhật khóa học' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await pool.query('DELETE FROM lessons WHERE courseId=?', [id])
        const [result] = await pool.query<any>('DELETE FROM courses WHERE id=?', [id])
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Khóa học không tồn tại' })
        res.json({ message: 'Xóa khóa học thành công' })
    } catch {
        res.status(500).json({ error: 'Không thể xóa khóa học' })
    }
})

router.post('/:id/lessons', async (req, res) => {
    const { id } = req.params
    const { name, time } = req.body

    if (!name || !time) return res.status(400).json({ error: 'Name và time là bắt buộc' })

    try {
        const [course] = await pool.query<any[]>('SELECT id FROM courses WHERE id=?', [id])
        if (!course.length) return res.status(404).json({ error: 'Khóa học không tồn tại' })

        const [result] = await pool.query<any>(
            'INSERT INTO lessons (courseId, name, time) VALUES (?, ?, ?)',
            [id, name, time]
        )

        await pool.query('UPDATE courses SET numberLessons = numberLessons + 1 WHERE id = ?', [id])

        const newLesson = { id: result.insertId, name, time }
        res.json(newLesson)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Không thể thêm bài học' })
    }
})

router.put('/:id/lessons/:lessonId', async (req, res) => {
    const { id, lessonId } = req.params
    const { video, document, test, pdf, flash, audio } = req.body
    try {
        const [result] = await pool.query<any>(
            'UPDATE lessons SET video=?, document=?, test=?, pdf=?, flash=?, audio=? WHERE id=? AND courseId=?',
            [video || null, document || null, test || null, pdf || null, flash || null, audio || null, lessonId, id]
        )
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Bài học không tồn tại' })
        res.json({ message: 'Cập nhật bài học thành công' })
    } catch {
        res.status(500).json({ error: 'Không thể cập nhật bài học' })
    }
})

router.delete('/:id/lessons/:lessonId', async (req, res) => {
    const { id, lessonId } = req.params
    try {
        const [result] = await pool.query<any>('DELETE FROM lessons WHERE id=? AND courseId=?', [lessonId, id])
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Bài học không tồn tại' })
        await pool.query('UPDATE courses SET numberLessons = numberLessons - 1 WHERE id = ?', [id])
        res.json({ message: 'Xóa bài học thành công' })
    } catch {
        res.status(500).json({ error: 'Không thể xóa bài học' })
    }
})

router.post('/:courseId/lessons/:lessonId/contents', async (req, res) => {
    const { courseId, lessonId } = req.params;
    const { type, data, display_order = 0 } = req.body;

    if (!type || !data) return res.status(400).json({ error: 'Type và data là bắt buộc' });

    try {
        const [lesson] = await pool.query<any[]>('SELECT id FROM lessons WHERE id = ? AND courseId = ?', [lessonId, courseId]);
        if (!lesson.length) return res.status(404).json({ error: 'Bài học không tồn tại' });

        const [result] = await pool.query<any>(
            'INSERT INTO lesson_contents (lesson_id, type, data, display_order) VALUES (?, ?, ?, ?)',
            [lessonId, type, JSON.stringify(data), display_order]
        );

        res.json({ id: result.insertId, lessonId, type, data, display_order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Không thể thêm nội dung bài học' });
    }
});

router.put('/:courseId/lessons/:lessonId/contents', async (req, res) => {
    const { courseId, lessonId } = req.params;
    const { type, data, display_order = 0 } = req.body;

    if (!type || !data) return res.status(400).json({ error: 'Type và data là bắt buộc' });

    try {
        const [lesson] = await pool.query<any[]>('SELECT id FROM lessons WHERE id = ? AND courseId = ?', [lessonId, courseId]);
        if (!lesson.length) return res.status(404).json({ error: 'Bài học không tồn tại' });

        const [existingContents] = await pool.query<any[]>(
            'SELECT id FROM lesson_contents WHERE lesson_id = ? AND type = ?',
            [lessonId, type]
        );

        let result;
        if (existingContents.length > 0) {
            [result] = await pool.query<any>(
                'UPDATE lesson_contents SET data = ?, display_order = ? WHERE lesson_id = ? AND type = ?',
                [JSON.stringify(data), display_order, lessonId, type]
            );
        } else {
            [result] = await pool.query<any>(
                'INSERT INTO lesson_contents (lesson_id, type, data, display_order) VALUES (?, ?, ?, ?)',
                [lessonId, type, JSON.stringify(data), display_order]
            );
        }

        res.json({
            id: existingContents.length > 0 ? existingContents[0].id : result.insertId,
            lessonId,
            type,
            data,
            display_order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Không thể cập nhật nội dung bài học' });
    }
});


export default router
