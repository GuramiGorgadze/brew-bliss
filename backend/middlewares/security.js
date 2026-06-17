import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'

export const helmetMiddleware = helmet()

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        callback(null, origin || '*')
    },
    credentials: true
})

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' }
})

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many login attempts, please try again later.' }
})