import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    /*
      there can be a case where user try to send the accesstoken in headers and JWT stores the accessToken like this Authorization: "Bearer <token>"
    */
    const token = 
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Add a check to ensure that the token is a non-empty string
    // if (typeof token !== "string" || token.trim() === "") {
    //   throw new ApiError(401, "Invalid token format");
    // }

    // decodedTOken is the object which we stored while creating the accessToken
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
















