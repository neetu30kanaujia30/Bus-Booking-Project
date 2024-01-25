import ticketsService from "./tickets.service.js";
class ticketController {
  async updateBookingStatus(req, res, next) {
    /* 	#swagger.tags = ['Tickets']
                            #swagger.description = 'This routes is used for UPDATE booking status -"open", "close", "booked", "cancelled"]' */
    /*
/*#swagger.parameters['keyword'] = {
    in: 'body',
                                 type: 'object',
                                description: 'Review dummy -data  below that mention',
                                required: true,
                                schema: { $ref: "#/definitions/updateStatus" }
        }*/
    /*  #swagger.responses[dummy-data] = {
                                description: 'Dummy data',
                                schema: { $ref: "#/definitions/updateStatus" }
    }*/

    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await ticketsService.updateBookingStatus(req, res, next);
  }
  async getAllTickets(req, res, next) {
    /* 	#swagger.tags = ['Tickets']
                            #swagger.description = 'This routes is used for fetch all tickets' */
    /* #swagger.parameters['skip'] = {
    in: 'query',
    description: 'results skip',
    schema: {
        type: 'integer'
    }
} */
    /* #swagger.parameters['limit'] = {
    in: 'query',
    description: 'results limit',
    schema: {
        type: 'integer'
    }
} */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await ticketsService.getAllTickets(req, res, next);
  }
  async fetchDataByStatus(req, res, next) {
    /* 	#swagger.tags = ['Tickets']
                            #swagger.description = 'This routes is used for get data by status ["open", "close", "booked", "cancelled"]' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await ticketsService.fetchDataByStatus(req, res, next);
  }
  async fetchDataById(req, res, next) {
    /* 	#swagger.tags = ['Tickets']
                            #swagger.description = 'This routes is used for get data by Id' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await ticketsService.fetchDataById(req, res, next);
  }
  async reset(req, res, next) {
    /* 	#swagger.tags = ['DB']
                            #swagger.description = 'This routes is used for Reset DB' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await ticketsService.reset(req, res, next);
  }
  async seedDB(req, res, next) {
    /* 	#swagger.tags = ['DB']
                            #swagger.description = 'This routes is used for Seed DB' */
    /* #swagger.security = [{
               "AccessToken": []
        }] */
    return await ticketsService.seedDB(req, res, next);
  }
}
export default new ticketController();
