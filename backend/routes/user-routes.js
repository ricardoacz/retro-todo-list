import express from 'express'
import { createUser, deleteUser, getUser } from '../controller/user-controller.js'

const router = express.Router()

router.get('/', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)

export default router