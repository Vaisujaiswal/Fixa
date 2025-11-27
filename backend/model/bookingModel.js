

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  proId: { type: mongoose.Schema.Types.ObjectId, ref: "provider", required: true },
  slotData: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  proData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // ✅ fixed (was "data")
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false }
});

const BookingModel = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default BookingModel;
