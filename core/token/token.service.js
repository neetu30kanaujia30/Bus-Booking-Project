import Response from "../../response/response.js";
import jwt from "jsonwebtoken";
import config from "config";

class TokenService {
  generateToken(req, res) {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { username: config.get("user.username") }, // Payload containing user data
        config.get("token_secret"), // Secret key for signing the token
        { algorithm: "HS256", expiresIn: "1h" } // Token options: algorithm and expiration time
      );
      
      // Send success response with the generated token
      res.status(200).send(
        Response.tokenSuccessResp(
          "Token generated successfully. It will expire in 1 hour.",
          token
        )
      );
    } catch (error) {
      // Handle error if token generation fails
      console.error("Error generating token:", error);
      res.status(500).send(Response.errorResp("Token generation failed."));
    }
  }
}

export default new TokenService();
