import Joi from "joi";
class ticketValidate {
  updateStatus(body) {
    console.log(body);
    const schema = Joi.object({
      ticketId: Joi.string().required(),
      status: Joi.string()
        .valid("open", "close", "booked", "cancelled")
        .required(),
    });
    const result = schema.validate(body);
    console.log(result);
    return result;
  }
  viewStatus(body) {
    console.log(body);
    const schema = Joi.object({
      status: Joi.string()
        .valid("open", "close", "booked", "cancelled")
        .required(),
    });
    const result = schema.validate(body);
    console.log(result);
    return result;
  }
  viewId(body) {
    console.log(body);
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const result = schema.validate(body);
    console.log(result);
    return result;
  }
}
export default new ticketValidate();
