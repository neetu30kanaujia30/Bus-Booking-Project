import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  dob: { type: String, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Invalid phone number format",
    },
  },
  lastLogin: { type: Date },
  isAdmin: { type: Boolean, default: false },
});
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
