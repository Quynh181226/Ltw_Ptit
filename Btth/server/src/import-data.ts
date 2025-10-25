import fs from 'fs'
import path from 'path'
import pool from './config/db'
import type { Category, Test, User } from './types/type'

interface DBData {
    categories: Category[]
    users: User[]
    tests: Test[]
}

async function importData() {
    try {
        const raw = fs.readFileSync(path.join(__dirname, '../db.json'), 'utf-8')
        const data: DBData = JSON.parse(raw)

        await pool.query('SET FOREIGN_KEY_CHECKS = 0')
        await pool.query('TRUNCATE TABLE answers')
        await pool.query('TRUNCATE TABLE questions')
        await pool.query('TRUNCATE TABLE tests')
        await pool.query('TRUNCATE TABLE users')
        await pool.query('TRUNCATE TABLE categories')
        await pool.query('SET FOREIGN_KEY_CHECKS = 1')

        for (const cat of data.categories) {
            await pool.query(
                'INSERT INTO categories (id, name, image) VALUES (?, ?, ?)',
                [cat.id, cat.name, cat.image]
            )
        }

        for (const user of data.users) {
            await pool.query('INSERT INTO users SET ?', user)
        }

        for (const test of data.tests) {
            const { quesDetail, ...testData } = test
            const [tRes] = await pool.query('INSERT INTO tests SET ?', testData)
            const testId = (tRes as any).insertId

            for (const q of quesDetail || []) {
                const { answers, ...qData } = q
                const [qRes] = await pool.query('INSERT INTO questions SET ?', {
                    ...qData,
                    testId
                })
                const qId = (qRes as any).insertId

                for (const a of answers || []) {
                    await pool.query('INSERT INTO answers SET ?', {
                        ...a,
                        questionId: qId
                    })
                }
            }
        }

        console.log('IMPORT THÀNH CÔNG!')
        process.exit(0)
    } catch (err: any) {
        console.error('LỖI:', err.message)
        process.exit(1)
    }
}

importData()
