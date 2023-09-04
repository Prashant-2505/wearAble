import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import morgan from 'morgan'
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoutes.js"
import productRoute from './routes/productRoute.js'
import cors from 'cors'
import path from 'path'
import {fileUrlToPath} from 'url'


//config env
dotenv.config()
// database config
connectDb()


// es module fix
const __filename = fileUrlToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()

// middleware
// Increase the JSON request size limit (adjust the limit as needed)
app.use(express.json({ limit: '20mb' }));
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'../client/build')))

// routes
// auth route
app.use('/api/v2/auth',authRoute)
// category route
app.use('/api/v2/category',categoryRoute)
// product route
app.use('/api/v2/product',productRoute)

app.use('*',function(req,res)
{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})


const port = process.env.PORT || 8080
app.listen(port, ()=>
{
    console.log(`server is running at ${port}`.bgYellow)
})