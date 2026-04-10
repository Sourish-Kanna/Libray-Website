import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { connectAdminDB } from "./db/adminConnection.js";
import { app } from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        connectAdminDB();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
            console.log(`⚙️ Database connected successfully !!! `);
            console.log(`⚙️ Admin Database connected successfully !!! `);
            console.log(`⚙️ If you see prod db update baseapi in frontend.`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
