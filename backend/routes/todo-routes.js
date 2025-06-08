import express from 'express'
import { createTodo, deleteTodo, getTodos, markTodoDone, markTodoImportant, unmarkTodoDone, unmarkTodoImportant, updateTodo } from '../controller/todo-controller.js'

const router = express.Router()

router.get('/', getTodos)

router.post('/create', createTodo)

router.put('/id', updateTodo)
router.put('/id', markTodoDone)
router.put('/id', unmarkTodoDone)
router.put('/id', markTodoImportant)
router.put('/id', unmarkTodoImportant)

router.delete('/id', deleteTodo)

export default router