import Response from "../../response/response.js";
import config from "config";
import ticketValidate from "./tickets.validate.js";
import Logger from "../../resources/logs/logger.log.js";
import BookingModel from "../../resources/models/BookingModel.js";
import UserModel from "../../resources/models/UserModel.js";
import mongoose from "mongoose";
import { buildQuery } from "../../core/helper/function.js";
import bookingSeeder from "../../resources/seeders/booking.js";
import userSeeder from "../../resources/seeders/user.js";
class TicketService {
  async updateBookingStatus(req, res) {
    try {
      const { ticketId, status } = req.body;
      const { error } = ticketValidate.updateStatus(req.body);
      if (error) {
        return res
          .status(400)
          .send(Response.validationFailResp("Validation Fail", error.message));
      }
      const ticketObjectId = new mongoose.Types.ObjectId(ticketId);
      const updatedTicket = await BookingModel.findOneAndUpdate(
        { _id: ticketObjectId },
        { status: status },
        { new: true },
      );
      if (!updatedTicket) {
        return res
          .status(404)
          .send(
            Response.TicketsFailResp("Ticket not found", "Ticket id not in db"),
          );
      }
      return res.send(
        Response.ticketSuccessListAllResp("Update successful", updatedTicket),
      );
    } catch (error) {
      console.log(`Error in catch ${error?.message}`);
      return res
        .status(400)
        .send(Response.TicketsFailResp("Unexpected Error", error?.message));
    }
  }
  async getAllTickets(req, res) {
    try {
      let limit = Number(req.query.limit) || 50;
      let page = Number(req.query.page) || 1;
      let skip = (page - 1) * limit;
      const query = await buildQuery({ skip, limit });

      const [results, totalCount, bookingSeatCount] = await Promise.all([
        BookingModel.aggregate(query),
        BookingModel.countDocuments(),
        BookingModel.countDocuments({ status: "booked" }),
      ]);
      let currentPage = page;
      let totalPages = Math.ceil(totalCount / limit);
      let firstPageURL = `http://${config.get("user.host_url")}/v1/tickets?page=1&limit=${limit}`;
      let from = skip + 1;
      let to = Math.min(skip + limit, totalCount);
      let nextPageURL =
        page < totalPages
          ? `http://${config.get("user.host_url")}/v1/tickets?page=${page + 1}&limit=${limit}`
          : null;
      let prevPageURL =
        page > 1
          ? `http://${config.get("user.host_url")}/v1/tickets?page=${page - 1}&limit=${limit}`
          : null;
      let path = `http://${config.get("user.host_url")}/v1/tickets`;
      let perPage = limit;
      return res.status(200).send(
        Response.ticketSuccessListAllResp("fetch successfully", {
          page: currentPage,
          limit: limit,
          current_page: currentPage,
          first_page_url: firstPageURL,
          from: from,
          next_page_url: nextPageURL,
          path: path,
          per_page: perPage,
          prev_page_url: prevPageURL,
          to: to,
          totalCount,
          bookingSeatCount,
          data: results,
        }),
      );
    } catch (error) {
      Logger.error(`Unexpected Error in getAllTickets`, error?.message);
      return res
        .status(400)
        .send(Response.TicketsFailResp(`Unexpected Error`, error?.message));
    }
  }
  async fetchDataByStatus(req, res) {
    try {
      const status = req.params.status;
      const { error } = ticketValidate.viewStatus({
        status: req.params.status,
      });
      if (error) {
        return res
          .status(400)
          .send(Response.validationFailResp("Validation Fail", error.message));
      }

      const query = await buildQuery({ status });

      const data = await BookingModel.aggregate(query);

      if (!data || data.length === 0) {
        return res
          .status(200)
          .send(
            Response.ticketSuccessGetDataByStatusResp(
              "No data found for the provided status.",
              status,
              data,
            ),
          );
      }
      return res
        .status(200)
        .send(
          Response.ticketSuccessGetDataByStatusResp(
            "fetch successfully by status",
            status,
            data,
          ),
        );
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in fetchDataByStatus`, error?.message);
      res
        .status(400)
        .send(Response.TicketsFailResp(`UnExpected Error`, error?.message));
    }
  }
  async fetchDataById(req, res) {
    try {
      const { error } = ticketValidate.viewId({ id: req.params.id });
      if (error) {
        return res
          .status(400)
          .send(Response.validationFailResp("Validation Fail", error.message));
      }
      const id = new mongoose.Types.ObjectId(req.params.id);
      const query = await buildQuery({ id });
      const data = await BookingModel.aggregate(query);
      if (!data || data.length === 0) {
        return res
          .status(200)
          .send(
            Response.ticketSuccessGetDataByStatusResp(
              "No data found for the provided status.",
              id,
              data,
            ),
          );
      }
      return res
        .status(200)
        .send(
          Response.ticketSuccessGetDataByStatusResp(
            "fetch successfully by status",
            id,
            data,
          ),
        );
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in fetchDataByStatus`, error?.message);
      res
        .status(400)
        .send(Response.TicketsFailResp(`UnExpected Error`, error?.message));
    }
  }

  async seedDB(req, res) {
    try {
      await userSeeder();
      await bookingSeeder();
      return res.send(Response.ticketSuccessSeedReset("Seed successful Done"));
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in Seed`, error?.message);
      res
        .status(400)
        .send(Response.TicketsFailResp(`UnExpected Error`, error?.message));
    }
  }
  async reset(req, res) {
    try {
      await BookingModel.deleteMany({});
      await UserModel.deleteMany({});

      return res.send(Response.ticketSuccessSeedReset("Reset successful Done"));
    } catch (error) {
      console.log(`Error in catch ${error}`);
      Logger.error(`UnExpected Error in Reset`, error?.message);
      res
        .status(400)
        .send(Response.TicketsFailResp(`UnExpected Error`, error?.message));
    }
  }
}
export default new TicketService();
