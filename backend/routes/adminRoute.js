import express from 'express';
import { addProvider, adminDashboard, adminLogin, bookingCancle, Bookings, getAllProviders } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvalability } from '../controllers/providerController.js';

const adminRouter = express.Router();

adminRouter.post('/add-provider',authAdmin, upload.single('image'), addProvider);
adminRouter.post('/login', adminLogin);
adminRouter.post('/provider-list',authAdmin, getAllProviders);
adminRouter.post('/change-availability',authAdmin, changeAvalability);
adminRouter.get('/all-bookings', authAdmin, Bookings );
adminRouter.post('/cancle-booking', authAdmin, bookingCancle );
adminRouter.get('/dashboard', authAdmin, adminDashboard);



export default adminRouter;