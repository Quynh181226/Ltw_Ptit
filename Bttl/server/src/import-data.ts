import fs from 'fs'
import path from 'path'
import pool from './config/db'
import { ResultSetHeader } from 'mysql2'
import type { Category, Test, User, Course, Exam, Topic, Result } from './types/type'

interface DBData {
    categories: Category[]
    users: User[]
    tests: Test[]
    courses: Course[]
    exams: Exam[]
    // topics: Topic[]
    results: Result[]
}

async function importData() {
    try {
        const raw = fs.readFileSync(path.join(__dirname, '../db.json'), 'utf-8')
        const data: DBData = JSON.parse(raw)

        if (
            !data.categories ||
            !data.users ||
            !data.tests ||
            !data.courses ||
            !data.exams ||
            // !data.topics ||
            !data.results
        ) {
            throw new Error('Invalid db.json format: Missing required fields')
        }

        await pool.query('SET FOREIGN_KEY_CHECKS = 0')
        const tables = [
            'answers',
            'questions',
            'tests',
            'users',
            'categories',
            'courses',
            'lessons',
            'lesson_contents',
            'exams',
            'exam_questions',
            // 'topics_word',
            'results_exam'
        ]
        for (const table of tables) await pool.query(`TRUNCATE TABLE ${table}`)
        await pool.query('SET FOREIGN_KEY_CHECKS = 1')

        for (const cat of data.categories) {
            await pool.query('INSERT INTO categories (id, name, image) VALUES (?, ?, ?)', [
                cat.id,
                cat.name,
                cat.image
            ])
        }

        for (const user of data.users) {
            await pool.query('INSERT INTO users SET ?', user)
        }

        for (const test of data.tests) {
            const { quesDetail, ...testData } = test
            const [tRes] = await pool.query<ResultSetHeader>('INSERT INTO tests SET ?', testData)
            const testId = tRes.insertId

            for (const q of quesDetail || []) {
                const { answers, ...qData } = q
                const [qRes] = await pool.query<ResultSetHeader>('INSERT INTO questions SET ?', {
                    ...qData,
                    testId
                })
                const qId = qRes.insertId

                for (const a of answers || []) {
                    await pool.query('INSERT INTO answers SET ?', { ...a, questionId: qId })
                }
            }
        }

        for (const course of data.courses) {
            const [cRes] = await pool.query<ResultSetHeader>(
                'INSERT INTO courses (title, numberLessons, status, createdAt) VALUES (?, ?, ?, ?)',
                [
                    course.title,
                    course.numberLessons,
                    course.status,
                    course.createdAt || new Date().toISOString()
                ]
            )
            const courseId = cRes.insertId

            for (const lesson of (course as any).Lesson || []) {
                const [lRes] = await pool.query<ResultSetHeader>(
                    'INSERT INTO lessons (courseId, name, time) VALUES (?, ?, ?)',
                    [courseId, lesson.name, lesson.time]
                )
                const lessonId = lRes.insertId

                const contentMappings = [
                    { type: 'video', data: lesson.video },
                    { type: 'document', data: lesson.document },
                    { type: 'test', data: lesson.test },
                    { type: 'pdf', data: lesson.pdf },
                    { type: 'flash', data: lesson.flash },
                    { type: 'audio', data: lesson.audio }
                ]

                for (const content of contentMappings) {
                    if (content.data) {
                        await pool.query(
                            'INSERT INTO lesson_contents (lesson_id, type, data, display_order) VALUES (?, ?, ?, ?)',
                            [lessonId, content.type, JSON.stringify(content.data), 0]
                        )
                    }
                }
            }
        }

        for (const exam of data.exams || []) {
            const [eRes] = await pool.query<ResultSetHeader>(
                'INSERT INTO exams (title, status, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
                [
                    exam.title,
                    exam.status,
                    exam.createdAt || new Date().toISOString(),
                    exam.updatedAt || new Date().toISOString()
                ]
            )
            const examId = eRes.insertId

            for (const question of exam.exam || []) {
                await pool.query(
                    'INSERT INTO exam_questions (examId, name, time, test1, test2, test3) VALUES (?, ?, ?, ?, ?, ?)',
                    [
                        examId,
                        question.name,
                        question.time,
                        question.test1 || null,
                        question.test2 || null,
                        question.test3 || null
                    ]
                )
            }
        }

        // for (const topic of data.topics || []) {
        //     await pool.query(
        //         'INSERT INTO topics_word (title, japanese, createdAt) VALUES (?, ?, ?)',
        //         [topic.title, JSON.stringify(topic.japanese), topic.createdAt || new Date().toISOString()]
        //     )
        // }

        for (const result of data.results || []) {
            await pool.query(
                'INSERT INTO results_exam (name, imgUrl, birthDate, overall, createdAt) VALUES (?, ?, ?, ?, ?)',
                [
                    result.name,
                    result.imgUrl || null,
                    result.birthDate || null,
                    result.overall,
                    result.createdAt || new Date().toISOString()
                ]
            )
        }

        const [sampleCourse] = await pool.query<ResultSetHeader>(
            'INSERT INTO courses (title, numberLessons, status, createdAt) VALUES (?, ?, ?, NOW())',
            ['Sample Course 1', 1, false]
        )
        await pool.query('INSERT INTO lessons (courseId, name, time) VALUES (?, ?, ?)', [
            sampleCourse.insertId,
            'Sample Lesson',
            30
        ])
        await pool.query('INSERT INTO exams (title, status, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())', [
            'Sample Exam 1',
            false
        ])

        console.log('IMPORT THÀNH CÔNG!')
        process.exit(0)
    } catch (err: any) {
        console.error('LỖI IMPORT:', err.message)
        process.exit(1)
    }
}

importData()