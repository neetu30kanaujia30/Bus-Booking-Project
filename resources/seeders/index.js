import userSeed from "./user.js";
import bookingSeeder from "./booking.js";
import connection from "../database/mongoConnect.js";
const seeder = () => {
  connection()
    .then(async () => {
      await userSeed();
      await bookingSeeder();
    })
    .then(() => {
      console.log("---end----");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
seeder();
export { seeder };
