import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import morgan from 'morgan'
import authRoute from "./routes/authRoute.js"
// import categoryRoute from "./routes/categoryRoutes.js"
import cors from 'cors'

//config env
dotenv.config()
// database config
connectDb()

const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


// routes
// auth route
app.use('/api/v2/auth',authRoute)
// category route
// app.use('/api/v2/category',categoryRoute)


const port = process.env.PORT || 8080
app.listen(port, ()=>
{
    console.log(`server is running at ${port}`.bgYellow)
})