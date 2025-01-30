import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: 
        [
            'http://localhost:5173', 
            'https://libray-website-client.vercel.app',
            'https://libray-website.vercel.app',
        ],
    credentials: true
}))



app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import pyqRouter from './routes/pyqs.route.js';
import syllabusRouter from './routes/syllabus.route.js';
import newsRouter from './routes/newsRoute.js';
import branchRoutes from './routes/branchRoutes.js'
import semesterRoutes from './routes/semesterRoutes.js'
import monthRoutes from './routes/monthRoutes.js';
import yearRoutes from './routes/yearRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';

app.use("/api/v1/syllabus",syllabusRouter)

app.use("/api/v1/pyqs",pyqRouter)

app.use("/api/v1/users",userRouter)

app.use("/api/v1/news",newsRouter)

app.use('/api/v1/branch', branchRoutes);

app.use('/api/v1/semester', semesterRoutes);

app.use('/api/v1/month', monthRoutes);

app.use('/api/v1/year', yearRoutes);

app.use('/api/v1/subject', subjectRoutes);



export { app }