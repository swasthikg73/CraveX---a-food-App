import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://CraveX:Swasthik13271@cluster0.ekq3xkw.mongodb.net/CraveX"
    )
    .then(() => console.log("DB Connected"));
};
