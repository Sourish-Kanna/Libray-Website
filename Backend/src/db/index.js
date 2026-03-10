import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { backendLogger } from "../utils/logger.js";


const connectDB = async () =>{
    const start = Date.now();

    backendLogger.info({
        module: "db.index",
        action: "DB_CONNECT",
        step: "START",
        status: "STARTED",
        message: `[DB_CONNECT] START STARTED`,
        meta: { dbName: DB_NAME },
    });

    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}?appName=SIESGST_Library`);
        backendLogger.info({
            module: "db.index",
            action: "DB_CONNECT",
            step: "END",
            status: "SUCCESS",
            message: `[DB_CONNECT] END SUCCESS`,
            durationMs: Date.now() - start,
            meta: { host: connectionInstance.connection.host, dbName: DB_NAME },
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
        console.log(` MongoDB database : ${DB_NAME}`)
    }
    catch(error){
        backendLogger.error({
            module: "db.index",
            action: "DB_CONNECT",
            step: "END",
            status: "FAILURE",
            message: `[DB_CONNECT] END FAILURE`,
            durationMs: Date.now() - start,
            errorCode: "DB_ERROR",
            errorMessage: error?.message || "MONGODB connection error",
        });
        console.log("MONGODB connection error ",error);
        process.exit(1)
    }
}

export default connectDB 