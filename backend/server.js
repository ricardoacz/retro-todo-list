import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import todoRoutes from './routes/todo-routes.js'
import userRoutes from './routes/user-routes.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

const app = express()
app.use(express.json())

app.use('/api/todo', todoRoutes)
app.use('/api/user', userRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}



app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}, you better catch it!`)
})