import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Database Connected!"))
    .catch((error) =>
      console.log("Something went wrong in database connection!", error)
    );
};
