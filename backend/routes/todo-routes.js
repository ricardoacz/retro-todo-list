import express from 'express'
import { getTodos } from '../controller/todo-controller.js'

const router = express.Router()

router.get('/', getTodos)

export default router