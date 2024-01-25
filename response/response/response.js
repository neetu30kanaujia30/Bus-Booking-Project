class Response {
  productSuccessResp(message, data, totalRecord) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        total: totalRecord,
        data: data,
      },
    };
  }
  ProductFailResp(msg, err) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: msg,
        error: err,
      },
    };
  }
  salesSuccessResp(message, data, totalRecord) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        total: totalRecord,
        data: data,
      },
    };
  }
  salesFailResp(msg, err) {
    return {
      statusCode: 400,
      body: {
        status: "failed",
        message: msg,
        error: err,
      },
    };
  }
  logisticSuccessResp(message, data) {
    return {
      statusCode: 200,
      body: {
        status: "success",
        message: message,
        data: data,
      },
    };
  }
  logisticFailResp(msg, err) {
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
}
export default new Response();
