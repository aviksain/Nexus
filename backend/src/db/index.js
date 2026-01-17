import mongoose from 'mongoose';



const connectDB = async() => {
  try {
    const instence = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log(`\nMONGODB CONNECTED !! DB HOST: ${instence.connection.host}`);
  } catch (err) {
    console.log("MONGODB CONNECTION FAILED", err);
    process.exit(1);
  }
}



export default connectDB;


