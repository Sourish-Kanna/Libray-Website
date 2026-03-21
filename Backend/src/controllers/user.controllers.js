import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary,deleteOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { getAdminModel } from '../utils/getAdminModel.js';
import { backendLogger } from "../utils/logger.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    const start = Date.now();

    backendLogger.info({
        module: "user.controller",
        action: "TOKEN_REFRESH",
        step: "START",
        status: "STARTED",
        message: `[TOKEN_REFRESH] START STARTED`,
        meta: { userId: String(userId) },
    });

    try {
        backendLogger.info({
            module: "user.controller",
            action: "TOKEN_REFRESH",
            step: "READ_DB",
            status: "STARTED",
            message: `[TOKEN_REFRESH] READ_DB STARTED`,
            meta: { userId: String(userId) },
        });

        const AdminUser = getAdminModel(User);
        const user = await AdminUser.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        backendLogger.info({
            module: "user.controller",
            action: "TOKEN_REFRESH",
            step: "WRITE_DB",
            status: "STARTED",
            message: `[TOKEN_REFRESH] WRITE_DB STARTED`,
            meta: { userId: String(userId) },
        });

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        backendLogger.info({
            module: "user.controller",
            action: "TOKEN_REFRESH",
            step: "END",
            status: "SUCCESS",
            message: `[TOKEN_REFRESH] END SUCCESS`,
            durationMs: Date.now() - start,
            userId: String(userId),
        });

        return {accessToken, refreshToken}


    } catch (error) {
        backendLogger.error({
            module: "user.controller",
            action: "TOKEN_REFRESH",
            step: "END",
            status: "FAILURE",
            message: `[TOKEN_REFRESH] END FAILURE`,
            durationMs: Date.now() - start,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error?.message || "Token generation failed",
        });
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();

    backendLogger.info({
        module: "user.controller",
        action: "USER_REGISTER",
        step: "START",
        status: "STARTED",
        requestId,
        message: `[USER_REGISTER] START STARTED`,
    });

    const { fullName, email, username, password } = req.body;

    backendLogger.info({
        module: "user.controller",
        action: "USER_REGISTER",
        step: "VALIDATE_INPUT",
        status: "STARTED",
        requestId,
        message: `[USER_REGISTER] VALIDATE_INPUT STARTED`,
        meta: {
            hasFullName: Boolean(fullName),
            hasEmail: Boolean(email),
            hasUsername: Boolean(username),
            hasPassword: Boolean(password),
        },
    });

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        backendLogger.warn({
            module: "user.controller",
            action: "USER_REGISTER",
            step: "VALIDATE_INPUT",
            status: "FAILURE",
            requestId,
            message: `[USER_REGISTER] VALIDATE_INPUT FAILURE`,
            errorCode: "VALIDATION_ERROR",
            errorMessage: "All fields are required",
        });
        throw new ApiError(400, "All fields are required");
    }

    // if (!email.endsWith('@gst.sies.edu.in')) {
    //     throw new ApiError(400, "Please enter a valid college email ID");
    // }

    backendLogger.info({
        module: "user.controller",
        action: "USER_REGISTER",
        step: "READ_DB",
        status: "STARTED",
        requestId,
        message: `[USER_REGISTER] READ_DB STARTED`,
    });

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        backendLogger.warn({
            module: "user.controller",
            action: "USER_REGISTER",
            step: "READ_DB",
            status: "FAILURE",
            requestId,
            message: `[USER_REGISTER] READ_DB FAILURE`,
            errorCode: "VALIDATION_ERROR",
            errorMessage: "User with email or username already exists",
        });
        throw new ApiError(409, "User with email or username already exists");
    }

    // Check for avatar file
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        backendLogger.warn({
            module: "user.controller",
            action: "USER_REGISTER",
            step: "VALIDATE_INPUT",
            status: "FAILURE",
            requestId,
            message: `[USER_REGISTER] VALIDATE_INPUT FAILURE`,
            errorCode: "VALIDATION_ERROR",
            errorMessage: "Avatar file is required",
        });
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload avatar to Cloudinary
    backendLogger.info({
        module: "user.controller",
        action: "USER_REGISTER",
        step: "CALL_EXTERNAL",
        status: "STARTED",
        requestId,
        message: `[USER_REGISTER] CALL_EXTERNAL STARTED`,
    });

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        backendLogger.error({
            module: "user.controller",
            action: "USER_REGISTER",
            step: "CALL_EXTERNAL",
            status: "FAILURE",
            requestId,
            message: `[USER_REGISTER] CALL_EXTERNAL FAILURE`,
            errorCode: "EXTERNAL_SERVICE_ERROR",
            errorMessage: "Avatar upload failed",
        });
        throw new ApiError(400, "Avatar file is required");
    }

    // Identify if the user is a teacher or student based on email
    // const isStudent = /\d/.test(email);
    // const role = isStudent ? "student" : "teacher";

    // Create the user
    backendLogger.info({
        module: "user.controller",
        action: "USER_REGISTER",
        step: "WRITE_DB",
        status: "STARTED",
        requestId,
        message: `[USER_REGISTER] WRITE_DB STARTED`,
    });

    const AdminUser = getAdminModel(User);
    const user = await AdminUser.create({
        fullName,
        avatar: avatar.url,
        email, 
        password,
        username: username.toLowerCase(),
        // role,
    });

    const createdUser = await AdminUser.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        backendLogger.error({
            module: "user.controller",
            action: "USER_REGISTER",
            step: "READ_DB",
            status: "FAILURE",
            requestId,
            message: `[USER_REGISTER] READ_DB FAILURE`,
            errorCode: "DB_ERROR",
            errorMessage: "Failed to load created user",
        });
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    backendLogger.info({
        module: "user.controller",
        action: "USER_REGISTER",
        step: "SEND_RESPONSE",
        status: "SUCCESS",
        requestId,
        message: `[USER_REGISTER] SEND_RESPONSE SUCCESS`,
        durationMs: Date.now() - start,
        statusCode: 201,
        userId: String(createdUser?._id),
    });

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();

    backendLogger.info({
        module: "user.controller",
        action: "USER_LOGIN",
        step: "START",
        status: "STARTED",
        requestId,
        message: `[USER_LOGIN] START STARTED`,
    });

    const { email, password } = req.body;

    if (!email || !password) {
        backendLogger.warn({
            module: "user.controller",
            action: "USER_LOGIN",
            step: "VALIDATE_INPUT",
            status: "FAILURE",
            requestId,
            message: `[USER_LOGIN] VALIDATE_INPUT FAILURE`,
            errorCode: "VALIDATION_ERROR",
            errorMessage: "Email and password are required",
        });
        throw new ApiError(400, "Email and password are required");
    }

    backendLogger.info({
        module: "user.controller",
        action: "USER_LOGIN",
        step: "READ_DB",
        status: "STARTED",
        requestId,
        message: `[USER_LOGIN] READ_DB STARTED`,
    });

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        backendLogger.warn({
            module: "user.controller",
            action: "USER_LOGIN",
            step: "READ_DB",
            status: "FAILURE",
            requestId,
            message: `[USER_LOGIN] READ_DB FAILURE`,
            errorCode: "AUTH_ERROR",
            errorMessage: "Invalid email or password",
        });
        throw new ApiError(404, "Invalid email or password");
    }

    backendLogger.info({
        module: "user.controller",
        action: "USER_LOGIN",
        step: "VALIDATE_INPUT",
        status: "STARTED",
        requestId,
        message: `[USER_LOGIN] VALIDATE_INPUT STARTED`,
    });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        backendLogger.warn({
            module: "user.controller",
            action: "USER_LOGIN",
            step: "VALIDATE_INPUT",
            status: "FAILURE",
            requestId,
            message: `[USER_LOGIN] VALIDATE_INPUT FAILURE`,
            errorCode: "AUTH_ERROR",
            errorMessage: "Invalid email or password",
        });
        throw new ApiError(401, "Invalid email or password");
    }

    backendLogger.info({
        module: "user.controller",
        action: "USER_LOGIN",
        step: "ISSUE_TOKEN",
        status: "STARTED",
        requestId,
        message: `[USER_LOGIN] ISSUE_TOKEN STARTED`,
        userId: String(user?._id),
    });

    const token = generateAccessAndRefereshTokens({
        _id: user._id,
        email: user.email,
    });

    backendLogger.info({
        module: "user.controller",
        action: "USER_LOGIN",
        step: "SET_COOKIE",
        status: "STARTED",
        requestId,
        message: `[USER_LOGIN] SET_COOKIE STARTED`,
        userId: String(user?._id),
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    const userWithoutSensitiveData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        username: user.username,
        token,
    };

    backendLogger.info({
        module: "user.controller",
        action: "USER_LOGIN",
        step: "SEND_RESPONSE",
        status: "SUCCESS",
        requestId,
        message: `[USER_LOGIN] SEND_RESPONSE SUCCESS`,
        durationMs: Date.now() - start,
        statusCode: 200,
        userId: String(user?._id),
    });

    return res.status(200).json(
        new ApiResponse(200, userWithoutSensitiveData, "Login Successful")
    );
});


export { 
    registerUser,
    loginUser
    };
