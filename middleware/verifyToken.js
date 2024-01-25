import Response from "../response/response.js";
import config from "config";
import jwt from "jsonwebtoken";

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers["x-auth-token"];
    if (!authHeader)
      return res
        .status(403)
        .send(Response.tokenFailResp("Access token is required"));

    const token = authHeader;
    jwt.verify(token, config.get("token_secret"), { algorithms: ["HS256"] }, function (err, decoded) {
      if (err) {
        return res.status(401).send(Response.tokenFailResp("Invalid access token"));
      } else {
        next();
      }
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).send(Response.errorResp("Failed to verify access token"));
  }
}

export default verifyToken;
