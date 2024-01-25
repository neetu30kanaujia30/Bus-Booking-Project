class Response {
  tokenSuccessResp(message, data) {
    return {
      token: data,
      message: message,
    };
  }
  ticketSuccessListAllResp(message, data) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        data: data,
      },
    };
  }
  ticketSuccessSeedReset(message) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
      },
    };
  }
  ticketSuccessGetDataByStatusResp(message, status, data) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        status: status,
        data: data,
      },
    };
  }
  TicketsFailResp(msg, err) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: msg,
        error: err,
      },
    };
  }
  validationFailResp(message, error) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: message?.details,
        error: error,
      },
    };
  }
  tokenFailResp(message, error) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: message,
        error: error,
      },
    };
  }
}
export default new Response();
