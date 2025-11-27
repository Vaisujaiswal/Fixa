import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import providerModel from '../model/providerModel.js';
import BookingModel from '../model/bookingModel.js';
import UserModel from '../model/userModel.js';
import nodemailer from "nodemailer";
import { sendEmail } from '../config/sendEmail.js';

// API for user login

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter Valid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter Strong Password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }

}

// API for user login
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token })
    } else {
      return res.json({ success: false, message: "Invalide Credentials" });
    }

    res.json({ success: true, token })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }

}

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;   // ✅ comes from authUser middleware

    const userData = await userModel.findById(userId).select('-password');
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phoneNumber, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phoneNumber || !dob || !gender) {
      return res.json({ success: false, message: "Data is Missing" });
    }

    // update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phoneNumber,
        address: JSON.parse(address),
        dob,
        gender,
      },
      { new: true } // return updated user
    ).select("-password");

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updatedUser.image = imageUpload.secure_url;
      await updatedUser.save();
    }

    // 🔥 update all bookings where this user is involved
    await BookingModel.updateMany(
      { userId },
      { $set: { userData: updatedUser } }
    );

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// API to book user appointment
const bookAppointment = async (req, res) => {

  try {

    const { userId, proId, slotData, slotTime } = req.body;

    const proData = await providerModel.findById(proId).select('-password')

    if (!proData.available) {
      return res.json({ success: false, message: "Provider Not Available" })
    }

    // slot booked

    let slots_booked = proData.slots_booked;

    // checking if slot already booked
    if (slots_booked[slotData]) {
      if (slots_booked[slotData].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" })
      } else {
        slots_booked[slotData].push(slotTime)
      }
    } else {
      slots_booked[slotData] = []
      slots_booked[slotData].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete proData.slots_booked

    const appointmentData = {
      userId,
      proId,
      userData,
      proData,
      amount: proData.fees,
      slotData,
      slotTime,
      date: Date.now()
    }

    const newAppointment = new BookingModel(appointmentData)
    await newAppointment.save()

    await providerModel.findByIdAndUpdate(proId, { slots_booked })

    // Notify provider
    const provider = await providerModel.findById(proId);
    const user = await UserModel.findById(userId); // to get user name/email

    if (provider?.email) {
      const subject = "📩 New Booking Received!";
      const bodyContent = `
        Hi ${provider.name},<br/>
        You have a new booking from ${user.name}.<br/>
        <strong>Date:</strong> ${slotData}<br/>
        <strong>Time:</strong> ${slotTime}<br/>
        Please visit your dashboard to accept or reject this booking.
      `;
      await sendEmail(provider.email, subject, bodyContent);
    }

    res.json({ success: true, message: "Booking created & provider notified", appointmentData });

    // res.json({ success: true, message: "Appointment Booked" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}


// API to get user Booking for my-booking page
const listOfBookings = async (req, res) => {

  try {

    const userId = req.userId;
    const bookings = await BookingModel.find({ userId })
    res.json({ success: true, bookings })

  } catch (error) {

    console.log(error)
    res.json({ success: false, message: error.message })

  }

}


const cancleBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id; // or decoded._id based on your token payload

    const bookingData = await BookingModel.findById(bookingId);
    if (!bookingData) return res.json({ success: false, message: "Booking not found" });

    if (bookingData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized Access" });
    }

    await BookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    // release slot
    const { proId, slotData, slotTime } = bookingData;
    const proData = await providerModel.findById(proId);

    let slots_booked = proData.slots_booked;
    slots_booked[slotData] = slots_booked[slotData].filter((e) => e !== slotTime);

    await providerModel.findByIdAndUpdate(proId, { slots_booked });

    res.json({ success: true, message: "Booking Cancelled" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// Helper: create transporter using .env
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === "true", // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};



// POST /api/user/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // store OTP & expiry (10 minutes)
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // send email
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h3>Password Reset Request</h3>
          <p>Your OTP to reset password is:</p>
          <h2 style="letter-spacing: 4px;">${otp}</h2>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you did not request this, ignore this message.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("forgotPassword:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// POST /api/user/reset-password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) return res.status(400).json({ success: false, message: "Missing fields" });

    const user = await userModel.findOne({
      email,
      resetOtp: otp,
      resetOtpExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // clear otp fields
    user.resetOtp = null;
    user.resetOtpExpire = null;

    await user.save();

    // optionally generate token and return so client can auto-login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ success: true, message: "Password reset successful", token });
  } catch (error) {
    console.error("resetPassword:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listOfBookings, cancleBooking, resetPassword, forgotPassword };