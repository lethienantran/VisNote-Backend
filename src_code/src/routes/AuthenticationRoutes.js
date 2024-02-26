/** Initialize necessary modules */
import express from "express";
import * as responseBuilder from "../utils/interfaces/IResponseBuilder.js";
import * as authenticationServices from "../controllers/interfaces/IAuthentication.js";
/** Initialize router for use */
const router = express.Router();

/**
 * POST/SIGN-UP
 * URL => /api/authentication/sign-up
 * Request Body:
 * {
 *      fullName: string,
 *      professionalArea: string (optional),
 *      emailAddress: string,
 *      username: string,
 *      password: string
 * }
 */
router.post("/sign-up", async (request, response) => {
  try {
    /** Handle empty request body */
    if (!request.body || Object.keys(request.body).length === 0) {
      return responseBuilder.MissingContent(response, "RB");
    }

    /** Return the Sign Up response */
    return await Promise.resolve(
      authenticationServices.SignUp(response, request.body)
    );
  } catch (error) {
    console.log("ERROR: There is an error while signing up:", error);
    return responseBuilder.ServerError(
      response,
      "There is an error while signing up."
    );
  }
});

/** Export the router */
export default router;
