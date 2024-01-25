// Import Mongoose
import { Schema, model } from "mongoose";
const bookingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "UserModel",
  },
  seat_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "closed", "pending", "cancelled", "booked"],
  },
  bus_no: {
    type: String,
    required: true,
  },
  booking_id: {
    type: String,
    required: true,
  },
  journey_time: {
    type: Date,
    required: true,
  },
  journey_to: {
    type: String,
    required: true,
  },
  journey_from: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const BookingModel = model("booking", bookingSchema);
export default BookingModel;
