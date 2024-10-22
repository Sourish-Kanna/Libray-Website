// import { asyncHandler } from "../utils/asyncHandler.js";
// import {ApiError} from "../utils/ApiError.js"
// import { User} from "../models/user.model.js"
// import {uploadOnCloudinary,deleteOnCloudinary} from "../utils/cloudinary.js"
// import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose";

// const generateAccessAndRefereshTokens = async(userId) =>{
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()

//         user.refreshToken = refreshToken
//         await user.save({ validateBeforeSave: false })

//         return {accessToken, refreshToken}


//     } catch (error) {
//         throw new ApiError(500, "Something went wrong while generating referesh and access token")
//     }
// }

// const registerUser = asyncHandler(async (req, res) => {
//     const { fullName, email, username, password } = req.body;

//     // Check for missing fields
//     if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     // Check if the email contains the college domain
//     if (!email.endsWith('@gst.sies.edu.in')) {
//         throw new ApiError(400, "Please enter a valid college email ID");
//     }

//     // Check if user already exists
//     const existedUser = await User.findOne({
//         $or: [{ username }, { email }]
//     });
//     if (existedUser) {
//         throw new ApiError(409, "User with email or username already exists");
//     }

//     // Check for avatar file
//     const avatarLocalPath = req.files?.avatar[0]?.path;
//     if (!avatarLocalPath) {
//         throw new ApiError(400, "Avatar file is required");
//     }

//     // Upload avatar to Cloudinary
//     const avatar = await uploadOnCloudinary(avatarLocalPath);
//     if (!avatar) {
//         throw new ApiError(400, "Avatar file is required");
//     }

//     // Identify if the user is a teacher or student based on email
//     const isStudent = /\d/.test(email);
//     const role = isStudent ? "student" : "teacher";

//     // Create the user
//     const user = await User.create({
//         fullName,
//         avatar: avatar.url,
//         email, 
//         password,
//         username: username.toLowerCase(),
//         role,
//     });

//     const createdUser = await User.findById(user._id).select(
//         "-password -refreshToken"
//     );

//     if (!createdUser) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "User registered Successfully")
//     );
// });

// export { registerUser };
