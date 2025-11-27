import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import providerModel from '../model/providerModel.js';
import jwt from 'jsonwebtoken';
import BookingModel from '../model/bookingModel.js';
import userModel from '../model/userModel.js';



// API for adding a new admin user
export const addProvider = async (req, res) => {
    try {
        const { name, email, password, speciality, location, address, experience, description, title, fees } = req.body;
        const imageFile = req.file;

        // checking for required fields
        if( !name || !email || !password || !speciality || !location || !address || !title || !experience || !description|| !fees){
            return res.status(400).json({success: false, message: "All fields are required" });
        }

        // checking for email validation format
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Invalid email format" });
        }

        // validating strong password 
        if(password.length < 8) {
            return res.status(400).json({success: false, message: "Password must be at least 6 characters long" });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // uploading image to cloudinary
        const imageUploadResponse = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
        });

        const imageUrl = imageUploadResponse.secure_url;

        const providerData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            location,
            address: JSON.parse(address),
            experience,
            title: req.body.title || 'Provider',
            description,
            fees,
            date: Date.now(),
        }

        // creating a new provider
        const newProvider = new providerModel(providerData);
        await newProvider.save();

        res.status(201).json({ success: true, message: "Provider added successfully" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email }, // payload is now an object
                process.env.JWT_SECRET,
                { expiresIn: '3d' }
            );
            return res.json({ success: true, token });
        }

        return res.status(401).json({ success: false, message: "Invalid email or password" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



// API for getting all providers
export const getAllProviders = async (req, res) => {
    try {

        const providers = await providerModel.find({}).select('-password');
        res.json({ success: true, providers });

    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }

}


// API to get all booking list

export const Bookings = async (req, res) => {

    try {

        const bookings = await BookingModel.find({});
        res.json({ success: true, bookings });
        
    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }

}





// // API to cancle the booking by admin
// export const bookingCancle = async (req, res) => {
//   try {
//     const { bookingId } = req.body;

//     // get user from token
//     const token = req.headers.atoken;
//     if (!token) return res.json({ success: false, message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id; // or decoded._id based on your token payload

//     const bookingData = await BookingModel.findById(bookingId);
//     if (!bookingData) return res.json({ success: false, message: "Booking not found" });

//     if (bookingData.userId.toString() !== userId.toString()) {
//       return res.json({ success: false, message: "Unauthorized Access" });
//     }

//     await BookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

//     // release slot
//     const { proId, slotData, slotTime } = bookingData;
//     const proData = await providerModel.findById(proId);

//     let slots_booked = proData.slots_booked;
//     slots_booked[slotData] = slots_booked[slotData].filter((e) => e !== slotTime);

//     await providerModel.findByIdAndUpdate(proId, { slots_booked });

//     res.json({ success: true, message: "Booking Cancelled" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };























// Cancel booking by Admin






export const bookingCancle = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const bookingData = await BookingModel.findById(bookingId);
    if (!bookingData) {
      return res.json({ success: false, message: "Booking not found" });
    }

    // Admin does NOT need to check userId
    await BookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    // Release slot
    const { proId, slotData, slotTime } = bookingData;
    const proData = await providerModel.findById(proId);

    let slots_booked = proData.slots_booked;
    slots_booked[slotData] = slots_booked[slotData].filter((e) => e !== slotTime);

    await providerModel.findByIdAndUpdate(proId, { slots_booked });

    res.json({ success: true, message: "Booking Cancelled by Admin" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




export const adminDashboard = async (req, res) => {

    try {

        const providers = await providerModel.find({});
        const bookings = await BookingModel.find({});
        const users = await userModel.find({});

        const dashData = {
            providers: providers.length,
            bookings: bookings.length,
            users: users.length,
            latestBookings: bookings.reverse().slice(0,5) // last 5 bookings
        }

        res.json({success: true, dashData})
        
    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }

}





// export const getProviderRatings = async (req, res) => {
//   try {
//     const ratings = await Review.aggregate([
//       {
//         $group: {
//           _id: "$providerId",
//           averageRating: { $avg: "$rating" },
//           totalReviews: { $sum: 1 }
//         }
//       },
//       {
//         $lookup: {
//           from: "provider",          // collection name in MongoDB
//           localField: "_id",
//           foreignField: "_id",
//           as: "provider"
//         }
//       },
//       { $unwind: "$provider" },
//       {
//         $project: {
//           _id: 1,
//           averageRating: 1,
//           totalReviews: 1,
//           providerName: "$provider.name"
//         }
//       }
//     ]);
//      console.log("Provider Ratings:", ratings);

//     res.status(200).json({ success: true, ratings });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };






// export const getProviderComments = async (req, res) => {
//   try {
//     const comments = await Review.find({ providerId: req.params.id })
//       .populate("userId", "name email")
//       .populate("providerId", "name"); // optional

//     res.status(200).json({ success: true, comments });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };