import tokenService from "./token.service.js";
class tokenController {
  async generateToken(req, res, next) {
    /* 	#swagger.tags = ['Token']
                            #swagger.description = 'This routes is used for generate token' */
    return await tokenService.generateToken(req, res, next);
  }
}
export default new tokenController();
