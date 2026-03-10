import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { connectAdminDB } from "./db/adminConnection.js";
import {app} from './app.js'
import { backendLogger } from "./utils/logger.js";
dotenv.config({
    path: './.env'
})

backendLogger.info({
    module: "index",
    action: "SERVER_BOOT",
    step: "START",
    status: "STARTED",
    message: `[SERVER_BOOT] START STARTED`,
});


connectDB()
.then(() => {
    backendLogger.info({
        module: "index",
        action: "DB_CONNECT",
        step: "END",
        status: "SUCCESS",
        message: `[DB_CONNECT] END SUCCESS`,
    });

    connectAdminDB();

    backendLogger.info({
        module: "index",
        action: "SERVER_BOOT",
        step: "START_LISTENER",
        status: "STARTED",
        message: `[SERVER_BOOT] START_LISTENER STARTED`,
        meta: { port: process.env.PORT || 8000 }
    });

    app.listen(process.env.PORT || 8000, () => {
        backendLogger.info({
            module: "index",
            action: "SERVER_BOOT",
            step: "END",
            status: "SUCCESS",
            message: `[SERVER_BOOT] END SUCCESS`,
            meta: { port: process.env.PORT || 8000 }
        });
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    backendLogger.error({
        module: "index",
        action: "DB_CONNECT",
        step: "END",
        status: "FAILURE",
        message: `[DB_CONNECT] END FAILURE`,
        errorCode: "DB_ERROR",
        errorMessage: err?.message || "MONGO db connection failed",
    });
    console.log("MONGO db connection failed !!! ", err);
})
