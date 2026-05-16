import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connection.js'
import cookieParser from 'cookie-parser';
import ProductsRouter from './routes/products.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser()); 

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || '*'); 
    },    
    credentials: true 
}));

app.use('/api/products', ProductsRouter)

app.listen(3000, () => {
    console.log('server has started')
    connectDB(process.env.CONNECTION_STRING)
})