import express from 'express'
import { bookAppointment, cancleBooking, forgotPassword, getProfile, listOfBookings, loginUser, registerUser, resetPassword, updateProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser, getProfile);
userRouter.post('/update-profile' ,upload.single('image'),authUser ,updateProfile);
userRouter.post('/my-booking', authUser, bookAppointment);
userRouter.get('/my-booking', authUser, listOfBookings);
userRouter.post('/cancle-booking', authUser, cancleBooking);


userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;