import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error:" + error);
      throw error;
    });

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error: " + err);
  });


  
// ;(async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

//         app.on('error', () => {
//             console.log('Error:' + error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log("App listening on port " + process.env.PORT);
//         })
//     }
//     catch(error) {
//         console.log("Error in Database Connection");
//     }
// })()
