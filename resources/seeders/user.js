// // userSeeder.js
import { faker } from "@faker-js/faker";
import UserModel from "../models/UserModel.js";
import config from "config";
const count = config.get("seederCount.user");
const getRandomGender = () => {
  const gender = ["Male", "Female", "Other"];
  const randomIndex = Math.floor(Math.random() * gender.length);
  return gender[randomIndex];
};
const generateRandom10DigitNumber = () => {
  const min = 1000000000; // 10^9
  const max = 9999999999; // 10^10 - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRandomUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
    },
    dob: faker.date.birthdate(),
    gender: getRandomGender(),
    phoneNumber: generateRandom10DigitNumber(),
    lastLogin: faker.date.recent(),
    isAdmin: false,
  };
};
const userSeed = async () => {
  try {
    await UserModel.collection.drop();
    for (let i = 0; i < count; i++) {
      const randomUser = generateRandomUser();
      await UserModel.create(randomUser);
    }
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
export default userSeed;
