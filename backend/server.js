import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import providerRouter from "./routes/providerRoute.js";
import userRouter from "./routes/userRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";


// app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter);  // http://localhost:3000/api/admin/add-provider
app.use('/api/provider', providerRouter);
app.use('/api/user', userRouter)
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API Working!");
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


