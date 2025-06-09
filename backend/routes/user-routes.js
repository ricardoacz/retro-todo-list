import express from 'express'
import { createUser, deleteUser, getUser, updateUser } from '../controller/user-controller.js'

const router = express.Router()

router.get('/', getUser)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router