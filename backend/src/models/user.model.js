import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

/* 
storing the 
  username, email, fullname, avatar-url, coverImage-url, watchHistory, password,refreshToken
*/

const schemaObj = {
  username: {
    type: "string",
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    indexed: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: "string",
    required: true,
    lowercase: true,
    trim: true,
  },
  avatar: {
    type: "string", //cloudinary-url
    required: true,
  },
  coverImage: {
    type: "string", //cloudinary-url
    required: true,
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  password: {
    type: "string",
    required: [true, "Password is required"],
  },
  refreshToken: {
    type: "string",
  },
};

const userSchema = new Schema(schemaObj, { timestamps: true });

/*
  In Mongoose, middleware functions are functions that are executed before or after certain operations (e.g., save, update, remove) are performed on a Mongoose model.
*/

/*
  Pre middleware functions are executed before the specified operation is initiated. They are useful for tasks such as validation, encryption, or any other kind of pre-processing that needs to occur before the operation is executed.
*/

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

/*
  In Mongoose, schema.methods allows you to add instance methods to your Mongoose models. Instance methods are functions that are available on each document (instance) created from the model. This allows you to define custom behavior for your documents.
*/

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// creating a new methods using .methods. 
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullname: this.fullname,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};




// "User" wil be save as "users" in the database
export const User = mongoose.model("User", userSchema);





