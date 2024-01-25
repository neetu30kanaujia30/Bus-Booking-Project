## _Neetu Kanaujia Test API for Node.js_

### Note : Api are secure (x-auth-token) need to pass "x-auth-token" in header (Kindly generate by addition api /v1/generate-token)

### Installation
1. Clone the repository
    ```sh
    git clone https://github.com/neetu30kanaujia30/Bus-Booking-Project.git
    ```

2. Install Node.js dependencies using npm
    ```sh
    npm install
    ```

3. MongoDB is used in this project. Please add the MongoDB Atlas Details in config/default.json.
    ```sh
   "mongo": {
    "username": "<>",
    "password": "<>",
    "host": "127.0.0.1",
    "db_name": "test",
    "url" : "<>"
    },
    ```


4. Setup database. (db name: "test") and run commands
    ```sh
    npm run seed

    or

    hit api  /v1/tickets/seed-db  
    ```

5. Run the server
    ```sh
    npm run dev
    ```

6. Access your server in the browser. It will run at local dev
    ```
    http://localhost:9002
    ```

7. For API documentation (Swagger), visit
    ```
    http://localhost:9002/explorer/
    ```


### Module Structure

 ```
└── core(modules)
├── user
│ ├── routes.js
│ ├── controller.js
│ ├── service.js
│ └── validate.js
├── booking
│ ├── routes.js
│ ├── controller.js
│ ├── service.js
│ └── validate.js
└── token
├── routes.js
├── controller.js
├── service.js
└── validate.js
 ```
##  API Overview

### Generate Token
- **Description:** API to generate a token.
- **Endpoint:** `GET /v1/generate-token`
- **Controller:** `tokenController.generateToken`

### Reset Server
- **Description:** API for admin to reset the server, removing all data entries.
- **Endpoint:** `GET /v1/tickets/reset`
- **Controller:** `ticketController.reset`

### Seed Database
- **Description:** API for admin to seed the database with initial data.
- **Endpoint:** `GET /v1/tickets/seed-db`
- **Controller:** `ticketController.seedDB`

### View All Tickets
- **Description:** API to view all tickets stored in the database.
- **Endpoint:** `GET /v1/tickets`
- **Controller:** `ticketController.getAllTickets`

### Update Ticket Status
- **Description:** API to update the status of a ticket.
- **Endpoint:** `PUT /v1/tickets`
- **Controller:** `ticketController.updateBookingStatus`
- **Accepted Status Values:** `open`, `close`, `booked`, `cancelled`

### View Tickets by Status
- **Description:** API to view tickets filtered by status.
- **Endpoint:** `GET /v1/tickets/status/:status`
- **Controller:** `ticketController.fetchDataByStatus`
- **Accepted Status Values:** `open`, `close`, `booked`, `cancelled`

### View Details of a Specific Ticket
- **Description:** API to view details of a specific ticket by its ID.
- **Endpoint:** `GET /v1/tickets/:id`
- **Controller:** `ticketController.fetchDataById`


### Description API Endpoint


 - **Description: GET /v1/generate-token Generate Token**
   
    The generateToken function is an asynchronous function that handles the generation of JSON Web Tokens (JWTs) in a Node.js application. It first signs a payload containing the username retrieved from a configuration file (config.get("user.username")) using a secret token retrieved from another configuration (config.get("token_secret")). The JWT is configured to use the HMAC SHA-256 algorithm for signing and has an expiration time of 1 hour (expiresIn: "1h"). Upon successful generation of the token, it sends a response to the client with a status code of 400 (which might be incorrect, as 400 usually indicates a client error, while this operation seems successful), along with a success message indicating that the token has been generated successfully and will expire in 1 hour. The generated token is also included in the response. In case of any errors during the token generation process, the function catches the error and logs it to the console for debugging purposes.

- **Description: GET /v1/tickets**
  
    1. It retrieves query parameters for pagination: limit (number of items per page) and page (current page).
    2. Calculates the skip value based on the page and limit to implement pagination.
    3. Uses aggregate() method to query the database using the BookingModel with MongoDB aggregation framework to retrieve tickets.
    4. Utilizes $lookup stage to perform a left outer join with the "users" collection to fetch user details associated with each booking.
    5. Projects specific fields and renames some fields for clarity.
    6. Counts total documents in the BookingModel collection and separately counts the documents with a specific status.
    7. Calculates pagination metadata such as currentPage, totalPages, firstPageURL, from, to, nextPageURL, and prevPageURL.
    8. Constructs URLs for pagination links.
    9. Constructs a response object with success message, pagination details, total count of tickets, count of booked tickets, and the retrieved ticket data.
    10. Sends the response with status 200 if successful, else logs the error and sends an error response with status 400.

- **Description: PUT /v1/tickets**
  
    1. This asynchronous function updates the status of a booking identified by its unique ticket ID.
    2. The request body should contain the `ticketId` and the new `status` to be updated.
    3. It first validates the incoming data using the `ticketValidate.updateStatus` method.
    4. If validation fails, it returns a 400 status code with a validation failure response.
    5. It then attempts to find the ticket in the database using its ObjectId.
    6. If the ticket is not found, it returns a 404 status code with a corresponding error response.
    7. Upon successful update, it returns a success response with the updated ticket details.
    8. In case of any unexpected errors during the process, it logs the error and returns a 400 status code with an error response.


- **Description: GET /v1/tickets/status/:status**
  
    1. This asynchronous function fetches ticket data based on the provided status.
    2. It accepts a status parameter from the request URL.
    3. First, it validates the status parameter using the `ticketValidate.viewStatus` method.
    4. If the validation fails, it returns a 400 status code with a validation failure response.
    5. Then, it queries the database using the `BookingModel.find()` method to retrieve all tickets with the specified status.
    6. If no data is found for the provided status, it returns a success response with a message indicating the absence of data.
    7. If data is found, it returns a success response with the retrieved ticket data.
    8. In case of any unexpected errors during the process, it logs the error and returns a 400 status code with an error response.

- **Description: GET /v1/tickets/:id**
  
    1. This asynchronous function fetches ticket data based on the provided ticket ID.
    2. It accepts a ticket ID parameter from the request URL.
    3. First, it validates the ticket ID parameter using the `ticketValidate.viewId` method.
    4. If the validation fails, it returns a 400 status code with a validation failure response.
    5. Then, it converts the ticket ID to a MongoDB ObjectId using `mongoose.Types.ObjectId`.
    6. It queries the database using the `BookingModel.find()` method to retrieve the ticket with the specified ID.
    7. If no data is found for the provided ID, it returns a success response with a message indicating the absence of data.
    8. If data is found, it returns a success response with the retrieved ticket data.
    9. In case of any unexpected errors during the process, it logs the error and returns a 400 status code with an error response.




- **Description: GET /v1/reset**

    This asynchronous function provides an endpoint to reset the database, effectively removing all data entries from both the BookingModel and UserModel collections. The process is essential for testing, development, or when a clean slate is required for the application's data.

    - First, it utilizes the Mongoose `deleteMany()` method to remove all documents from the BookingModel collection.
    - Next, it similarly deletes all documents from the UserModel collection.
    
    Upon successful completion of the reset process, it sends a success response indicating that the reset operation has been successfully executed, providing assurance to the user that the database is now empty and ready for new data entry or further operations.

    In the event of any unexpected errors during the reset process, such as connectivity issues or database constraints, it logs the error for debugging purposes and returns a 400 status code with an error response, ensuring users are informed of the issue and can take appropriate action if needed.



- **Description: GET /v1/seed-db**

    This asynchronous function seeds the database with initial data using Faker library to generate realistic test data. It triggers two separate seeding processes: `userSeeder` and `bookingSeeder`. 

    - `userSeeder`: Populates the users collection with fake user data such as names, email addresses, and other relevant details.
    - `bookingSeeder`: Generates fake booking data including booking IDs, seat numbers, journey details, and user associations.

    Upon successful seeding, it sends a success response indicating that the seeding process has been completed. In case of any unexpected errors during the seeding process, it logs the error and returns a 400 status code with an error response.


### Database Field Description

#### Booking Collection
```json
{
  "_id": {"$oid":"65b25372a9758c046d0d2eef"},
  "user_id": "65b25371a9758c046d0d2edd",
  "seat_number": "14",
  "status": "open",
  "bus_no": "EMJ7SO",
  "booking_id": "dxtZBe",
  "journey_time": {"$date":{"$numberLong":"1718717812228"}},
  "journey_to": "Palm Harbor",
  "journey_from": "Deckowfort",
  "created_at": {"$date":{"$numberLong":"1702811043648"}},
  "__v": {"$numberInt":"0"}
}
 ```
#### User Collection
```json
{
  "_id": {"$oid":"65b2536da9758c046d0d2e81"},
  "username": "Moises75",
  "email": "Garnet_Feeney@hotmail.com",
  "address": {
    "street": "491 Rolfson Fort",
    "city": "West Luciusview",
    "state": "Kentucky",
    "country": "Malaysia",
    "zipCode": "07194"
  },
  "dob": "Thu Feb 11 1954 13:39:32 GMT+0530 (India Standard Time)",
  "gender": "Male",
  "phoneNumber": "5812830205",
  "lastLogin": {"$date":{"$numberLong":"1706148839869"}},
  "isAdmin": false,
  "created_at": {"$date":{"$numberLong":"1706185581661"}},
  "__v": {"$numberInt":"0"}
}
__v": {"$numberInt":"0"}
}
 ```