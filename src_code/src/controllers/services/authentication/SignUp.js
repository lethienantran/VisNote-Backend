/** Initialize necessary modules */
import * as responseBuilder from "../../../utils/interfaces/IResponseBuilder.js";
import * as validators from "../../../utils/interfaces/IValidators.js";
import bcrypt from "bcryptjs";
import db from "../../../configurations/database/DatabaseConfigurations.js";

async function SignUp(response, body) {
  try {
    /** Validates the information */
    const errors = await SignUpValidator(body);

    if (errors.length > 0) {
      return responseBuilder.ValidationFailed(response, errors);
    }

    /** If information is valid, continue sign up process */
    const { fullName, emailAddress, username, password, professionalArea } =
      body;

    /** Initialize salt round for generating salt */
    const saltRounds = 10;

    /** Generate salt based on the given saltRounds */
    const salt = await bcrypt.genSalt(saltRounds);

    /** Encrypted password */
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newAccountData = professionalArea
      ? {
          FULL_NAME: fullName.trim(),
          EMAIL_ADDRESS: emailAddress.toLowerCase().trim(),
          USERNAME: username.toLowerCase().trim(),
          PASSWORD: encryptedPassword,
          PROF_AREA: professionalArea.trim(),
        }
      : {
          FULL_NAME: fullName.trim(),
          EMAIL_ADDRESS: emailAddress.toLowerCase().trim(),
          USERNAME: username.toLowerCase().trim(),
          PASSWORD: encryptedPassword,
        };

    await db("reviewer_account").insert(newAccountData);

    return responseBuilder.CreateSuccessful(response, body, "Your accounts");
  } catch (error) {
    /** Log error and return Server Error */
    console.log("ERROR: There is an error while signing up:", error);
    return responseBuilder.ServerError(
      response,
      `There is an error while signing up.${error}`
    );
  }
}

async function ValidateUsername(username, errors) {
  /** Validate username must be longer than 6 */
  if (username && typeof username === "string") {
    if (username.length < 6 || username.length > 50) {
      errors.push(
        "Username must be longer than 6 and less than 50 characters."
      );
    }

    /** Validate if username not exists */
    const user = await db("reviewer_account")
      .select("USERNAME")
      .where("USERNAME", "=", username.trim())
      .first();

    if (user) {
      errors.push("Username already exists.");
    }
  }
}

function ValidateDataType(body, errors) {
  const { fullName, professionalArea, emailAddress, username, password } = body;

  if (fullName && typeof fullName !== "string") {
    errors.push("Invalid type for full name.");
  }

  if (username && typeof username !== "string") {
    errors.push("Invalid type for username.");
  }

  if (password && typeof password !== "string") {
    errors.push("Invalid type for password.");
  }

  if (emailAddress && typeof emailAddress !== "string") {
    errors.push("Invalid type for email address.");
  }

  if (professionalArea && typeof professionalArea !== "string") {
    errors.push("Invalid type for professional area.");
  }
}

async function SignUpValidator(body) {
  try {
    /** Initialize errors for return */
    const errors = [];

    /** Extract variables from body */
    const { username, password } = body;

    /** Initialize required fields */
    const requiredFields = ["fullName", "emailAddress", "username", "password"];

    /** Create mapping for field with meaning response */
    const fieldMappings = {
      fullName: "Full Name",
      profArea: "Professional Area",
      emailAddress: "Email Address",
      username: "Username",
      password: "Password",
    };

    /** Create array of fields for data type string validate */
    const stringFields = [
      "fullName",
      "professionalArea",
      "emailAddress",
      "username",
      "password",
    ];

    /** Validate Required Fields */
    validators.ValidateRequiredFields(
      body,
      requiredFields,
      fieldMappings,
      errors
    );

    /** Validate type */
    validators.ValidateDataType(
      body,
      "string",
      stringFields,
      fieldMappings,
      errors
    );

    /** Validate username */
    await ValidateUsername(username, errors);

    /** Validate password */
    if (password && password.length < 6) {
      errors.push("Password must be longer than 6 characters.");
    }

    /** Return the list of errors */
    return errors;
  } catch (error) {
    /** Log error and return Server Error */
    console.log("ERROR: There is an error while validating signing up:", error);
    return ["There is an error while signing up."];
  }
}

/** Export module functions */
export { SignUp, SignUpValidator, ValidateDataType };
