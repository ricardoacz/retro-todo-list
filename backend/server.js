import express from 'express'
import dotenv from 'dotenv'
import todoRoutes from './routes/todo-routes.js'
import userRoutes from './routes/user-routes.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use('/api/todo', todoRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}, you better catch it!`)
})