import Router from "express";
const router = Router();

import ticketController from "./tickets.controller.js";
//Additional API for admin to reset the server.
router.get("/tickets/reset", ticketController.reset);
//Additional API for admin to reset the server.
router.get("/tickets/seed-db", ticketController.seedDB);
//view all tickets
router.get("/tickets", ticketController.getAllTickets);
//Update ticket status  ['open', 'close', 'booked', 'cancelled']
router.put("/tickets", ticketController.updateBookingStatus);
//View  tickets  by status ['open', 'close', 'booked', 'cancelled'];
router.get("/tickets/status/:status", ticketController.fetchDataByStatus);
// View details of a specific ticket.
router.get("/tickets/:id", ticketController.fetchDataById);

export default router;
