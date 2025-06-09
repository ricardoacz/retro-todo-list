import express from 'express'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo-controller.js'

const router = express.Router()

router.get('/', getTodos)

router.post('/', createTodo)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)

export default router