import mongoose from "mongoose";
// const MONGODB_URI = 'mongodb+srv://dhangarraju2005:rajudhangar@cluster0.i4dck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const MONGODB_URI='mongodb://localhost:27017/dyslexia'
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
const connectDb = async () => {
  if(mongoose.connections[0].readyState){
    console.log("MongoDb already Connected to altas");
    return;
  }
    try {
      console.log("yaha aaya");
      const conn = await mongoose.connect(MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error("Error ka message ",error.message);
      process.exit(1);
    }
  }

export default connectDb
