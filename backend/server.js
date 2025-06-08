import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
    res.send('Hola Mundo!!!')
})

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}, you better catch it!`)
})