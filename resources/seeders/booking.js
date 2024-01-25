import { faker } from "@faker-js/faker";
import BookingModel from "../models/BookingModel.js";
import UserModel from "../models/UserModel.js";
import config from "config";
const count = config.get("seederCount.booking");
const getRandomStatus = () => {
  const status = ["open", "closed", "pending", "cancelled", "booked"];
  const randomIndex = Math.floor(Math.random() * status.length);
  return status[randomIndex];
};
const generateRandomAlphaNumeric = () => {
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};
const getSeatUniqueno = () => {
  const seat_number = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const randomIndex = Math.floor(Math.random() * seat_number.length);
  return seat_number[randomIndex];
};
const generateDummyBookingData = async () => {
  const users = await UserModel.find({}, "_id");
  // Extracting user IDs as ObjectId type
  const userIds = users.map((user) => user._id);
  // Selecting a random user ID
  const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
  return {
    user_id: randomUserId,
    seat_number: getSeatUniqueno(),
    status: getRandomStatus(),
    bus_no: generateRandomAlphaNumeric(),
    booking_id: generateRandomAlphaNumeric(),
    journey_time: faker.date.future(),
    journey_to: faker.location.city(),
    journey_from: faker.location.city(),
    created_at: faker.date.past(),
  };
};
const bookingSeeder = async () => {
  try {
    await BookingModel.collection.drop();
    for (let i = 0; i < count; i++) {
      const randombooking = await generateDummyBookingData();
      await BookingModel.create(randombooking);
    }
    console.log("Booking seeded successfully");
  } catch (error) {
    console.error("Error seeding Booking:", error);
  }
};
export default bookingSeeder;
