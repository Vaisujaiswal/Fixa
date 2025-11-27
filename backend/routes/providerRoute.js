import express from 'express'
import { cancleBooking, completeBooking, providerBooking, providerDashboard, providerList, providerLogin, providerProfile, providerProfileUpdate } from '../controllers/providerController.js'
import authProvider from '../middlewares/authProvider.js';
import upload from '../middlewares/multer.js';

const providerRouter = express.Router()

providerRouter.get('/list', providerList);
providerRouter.post('/login', providerLogin);
providerRouter.get('/bookings', authProvider, providerBooking);
providerRouter.post('/complete-booking', authProvider, completeBooking);
providerRouter.post('/cancel-booking', authProvider, cancleBooking);
providerRouter.get('/dashboard', authProvider, providerDashboard);
providerRouter.get('/profile', authProvider, providerProfile)
providerRouter.post('/profile-update', authProvider,upload.single("image"), providerProfileUpdate)

export default providerRouter;