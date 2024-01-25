import Router from "express";
const router = Router();
import tokenController from "./token.controller.js";
//Additional API to generate the token.
router.get("/generate-token", tokenController.generateToken);
export default router;
