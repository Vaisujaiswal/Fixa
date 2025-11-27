
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import providerModel from "../model/providerModel.js";
import BookingModel from "../model/bookingModel.js";
import UserModel from "../model/userModel.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { sendEmail } from "../config/sendEmail.js";


const changeAvalability = async (req, res) => {
  try {
    const { proId } = req.body;

    const proData = await providerModel.findById(proId);
    if (!proData) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }

    const updatedProvider = await providerModel.findByIdAndUpdate(
      proId,
      { available: !proData.available },  // ✅ use `available`
      { new: true }
    );

    res.json({
      success: true,
      message: "Availability updated successfully",
      provider: updatedProvider
    });

  } catch (error) {
    console.error("Error in changeAvalability:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const providerList = async (req, res) => {
  try {
    const providers = await providerModel.find().select(["-password", "-email"]);
    res.json({ success: true, serviceProviders: providers });  // ✅ match frontend
  } catch (error) {
    console.error("Error in providerList:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const providerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find provider by email
    const provider = await providerModel.findOne({ email });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }

    // Step 2: Compare hashed password
    const isMatch = await bcrypt.compare(password, provider.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Step 3: Create JWT token
    const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET, {
      expiresIn: "7d" // optional expiration
    });

    res.json({ success: true, message: "Login successful", token });

  } catch (error) {
    console.error("Error in providerLogin:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// // API to get provider Booking for Provider panel
const providerBooking = async (req, res) => {
  try {
    const providerId = req.userId; // ✅ get ID from middleware
    const bookings = await BookingModel.find({ proId: providerId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error in providerBooking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const proId = req.userId;

    const bookingData = await BookingModel.findById(bookingId);

    if (bookingData && bookingData.proId.toString() === proId.toString()) {
      // mark as completed
      await BookingModel.findByIdAndUpdate(bookingId, { isCompleted: true });

      // send email to user
      const subject = "🎉 Your Booking is Confirmed!";
      const message = `Hello ${bookingData.userData.name},\n\nYour booking with ${bookingData.proData.name} has been confirmed.\n\n📅 Date: ${bookingData.slotData}\n⏰ Time: ${bookingData.slotTime}\n\nThank you for booking with us!`;

      await sendEmail(
        bookingData.userData.email, // ✅ user email
        subject,
        message,
        `<h2>${subject}</h2>
         <p>Hello ${bookingData.userData.name},</p>
         <p>Your booking with <b>${bookingData.proData.name}</b> has been confirmed.</p>
         <p><b>Date:</b> ${bookingData.slotData}<br/>
         <b>Time:</b> ${bookingData.slotTime}</p>
         <p>Thank you for booking with us! 🙏</p>`
      );

      return res.json({
        success: true,
        message: "Booking marked as completed & email sent",
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Booking not found or unauthorized" });
  } catch (error) {
    console.error("Error in completeBooking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancleBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const proId = req.userId;

    // Get booking details along with user and provider info
    const bookingData = await BookingModel.findById(bookingId)
      .populate('userId', 'name email')
      .populate('proId', 'name');

    if (bookingData && bookingData.proId._id.toString() === proId.toString()) {
      // Mark as cancelled
      await BookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

      // Send email to user
      const userEmail = bookingData.userId.email;
      const providerName = bookingData.proId.name;

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #e53935;">Booking Cancelled ❌</h2>
          <p>Hi <strong>${bookingData.userId.name}</strong>,</p>
          <p>Your booking with <strong>${providerName}</strong> has been <strong>cancelled</strong> by the provider.</p>
          <p>If you have any questions, please contact the provider directly.</p>
          <hr />
          <p style="font-size: 12px; color: #777;">This is an automated message from Fixa.</p>
        </div>
      `;

      await sendEmail(userEmail, "Booking Cancelled ❌", emailHtml);

      return res.json({ success: true, message: "Booking cancelled and user notified" });
    }

    return res.status(404).json({ success: false, message: "Cancellation failed" });

  } catch (error) {
    console.error("Error in cancleBooking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// API to get provider data for provider panel
const providerDashboard = async (req, res) => {

  try {

    // const {proId} = req.body;
    // const bookings = await BookingModel.find({proId})

      const proId = req.userId; // ✅ from JWT, not body
    const bookings = await BookingModel.find({ proId });


    let earnings = 0;

    bookings.map((item) => {
      if(item.isCompleted || item.payment){
        earnings += item.amount;
      }
    })

    let customers = [];

    bookings.map((item) => {
      if(!customers.includes(item.userId)){
        customers.push(item.userId);
      }
    })

    const dashData = {
      earnings,
      bookings: bookings.length,
      customers: customers.length,
      latestBookings: bookings.reverse().slice(0,5)
    }

    res.json({success: true, dashData});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }

}

// API to get provider data for provider profile
const providerProfile = async(req, res) => {
  try {

    //  const proId = req.userId; // ✅ from JWT, not body
    // const bookings = await BookingModel.find({ proId });

     const proId = req.userId;   // ✅ comes from authUser middleware

    const profileData = await providerModel.findById(proId).select('-password');
    if (!profileData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, profileData });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}


const providerProfileUpdate = async (req, res) => {
  try {
    const proId = req.userId; // ✅ always from JWT middleware
    const { name, email, address, experience, title, description, fees, available } = req.body;
    const imageFile = req.file; // ✅ Multer gives this

    let updateData = {
      name,
      email,
      address,
      experience,
      title,
      description,
      fees,
      available,
    };

    // ✅ If image uploaded, upload to Cloudinary
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "provider_profiles",
      });
      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await providerModel.findByIdAndUpdate(
      proId,
      updateData,
      { new: true } // return updated doc
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile Updated", profileData: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




export {changeAvalability, providerList, providerLogin, providerBooking, completeBooking, cancleBooking, providerDashboard, providerProfileUpdate, providerProfile, };