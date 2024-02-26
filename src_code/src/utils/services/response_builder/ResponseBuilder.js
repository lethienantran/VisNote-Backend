/**
 * This function is a helper that helps us build the response with the 'response' object from express
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {number} statusCode - The status code we want the response to send back.
 * @param {object} body - The body or the response object.
 * @returns a response with status code and a body.
 */
export function BuildResponse(res, statusCode, body) {
  return res.status(statusCode).json(body);
}

/**
 * Create a not found response message for an entity.
 *
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {String} entityName - The name of the entity that we want to specifically notice in the message.
 * @returns If entityName is defined, `entityName not found.` Otherwise, `Entity not found.`
 */
export function NotFound(res, entityName = "", message = "") {
  /** Return the message if we want a custom message */
  if (message !== "") {
    return BuildResponse(res, 200, {
      success: "error",
      code: 404,
      response: {
        message: message,
      },
    });
  }

  /** Construct a customized message for entity not found */
  let responseMessage = entityName.trim()
    ? entityName.trim().charAt(0).toUpperCase() + entityName.trim().slice(1)
    : "An entity";

  /** Create and return the response object */
  return BuildResponse(res, 200, {
    success: "error",
    code: 404,
    response: {
      message: `${responseMessage} not found.`,
    },
  });
}

/**
 * Create a successful response message for a newly created entity.
 *
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {object} responseObject - Optional. The response object containing data about the created entity.
 * @param {string} entityName - Optional. The name of the entity being created.
 * @returns {object} A response object with a success message and, optionally, the created entity data.
 */
export function CreateSuccessful(res, responseObject = null, entityName = "") {
  /** Construct a customized message for created entity */
  let responseMessage = entityName.trim()
    ? entityName.trim().charAt(0).toUpperCase() + entityName.trim().slice(1)
    : "An entity";

  /** Create and return response */
  if (!responseObject) {
    return BuildResponse(res, 200, {
      success: "ok",
      info: {
        message: `${responseMessage} successfully created.`,
      },
    });
  }

  /** If there is a response object, include them in response */
  return BuildResponse(res, 200, {
    success: "ok",
    info: {
      message: `${responseMessage} successfully created.`,
      responseObject: responseObject,
    },
  });
}

/**
 * Create a successful response message for a retrieved entity.
 *
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {object} responseObject - Optional. The response object containing data about the retrieved entity.
 * @param {string} entityName - Optional. The name of the retrieved entity.
 * @returns {object} A response object with a success message and, optionally, the retrieved entity data.
 */
export function GetSuccessful(res, responseObject = null, entityName = "") {
  // Construct a customized message for the retrieved entity
  let responseMessage = entityName.trim()
    ? entityName.trim().charAt(0).toUpperCase() + entityName.trim().slice(1)
    : "An entity";

  /** Create and return response in case there is no response object */
  if (!responseObject) {
    return BuildResponse(res, 200, {
      success: "ok",
      info: {
        message: `${responseMessage} successfully retrieved.`,
      },
    });
  }
  /** If there is a response object, include them in the response */
  return BuildResponse(res, 200, {
    success: "ok",
    info: {
      message: `${responseMessage} successfully retrieved.`,
      responseObject,
    },
  });
}

/**
 * Create a successful response message for an updated entity.
 *
 * @param {object} res - The response object for the HTTP request.
 * @param {object} responseObject - Optional. The response object containing data about the updated entity.
 * @param {string} entityName - Optional. The name of the updated entity.
 * @returns {object} A response object with a success message for the updated entity.
 */
export function UpdateSuccessful(res, responseObject = null, entityName = "") {
  /** Construct a customized message for updated entity */
  let responseMessage = entityName.trim()
    ? entityName.trim().charAt(0).toUpperCase() + entityName.trim().slice(1)
    : "An entity";

  /** Create and return response in case there is no response object */
  if (!responseObject) {
    return BuildResponse(res, 200, {
      success: "ok",
      info: {
        message: `${responseMessage} successfully updated.`,
      },
    });
  }
  /** If there is a response object, include them in the response */
  return BuildResponse(res, 200, {
    success: "ok",
    info: {
      message: `${responseMessage} successfully updated.`,
      responseObject,
    },
  });
}

/**
 * Create a successful response message for a deleted entity.
 *
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {string} entityName - Optional. The name of the deleted entity.
 * @returns {object} A response object with a success message for the deleted entity.
 */
export function DeleteSuccessful(res, entityName = "") {
  /** Construct a customized message for deleted entity */
  let responseMessage = entityName.trim()
    ? entityName.trim().charAt(0).toUpperCase() + entityName.trim().slice(1)
    : "An entity";

  /** Create and return response message */
  return BuildResponse(res, 200, {
    success: "ok",
    info: {
      message: `${responseMessage} successfully deleted.`,
    },
  });
}

/**
 * Create a response object for missing content.
 *
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {string} type - The type of missing content ("RB" for Request Body, nothing for Missing Required Fields).
 * @returns {object} A response object indicating the type of missing content.
 */
export function MissingContent(res, type) {
  /** Create and return the response object for type "RB" (Request Body) */
  if (type === "RB") {
    return BuildResponse(res, 200, {
      success: "error",
      code: 400,
      info: {
        message: "Request body is empty.",
      },
    });
  }

  /** Create and return the response object for missing required fields */
  return BuildResponse(res, 200, {
    success: "error",
    code: 400,
    info: {
      message: "Missing required fields!",
    },
  });
}

/**
 * Create a response object for a server error.
 *
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {string} message - Optional. A custom error message to include in the response.
 * @returns {object} A response object indicating a server error.
 */
export function ServerError(res, message = "") {
  if (message.length != 0) {
    /** Return the response */
    return BuildResponse(res, 200, {
      success: "error",
      code: 502,
      info: {
        message: message,
      },
    });
  }

  /** Return the response */
  return BuildResponse(res, 200, {
    success: "error",
    code: 502,
    info: {
      message: "Server is in maintenance. Please try again.",
    },
  });
}

/**
 * Create a response object for a bad request.
 *
 * @param {object} res - The response object for the HTTP request, so that it can use response's attributes to build response.
 * @param {string} message - Optional. A custom error message to include in the response.
 * @returns {object} A response object indicating a bad request.
 */
export function BadRequest(res, message = "") {
  if (message.length !== 0) {
    /** Return the response */
    return BuildResponse(res, 200, {
      success: "error",
      code: 400,
      info: {
        message: message,
      },
    });
  }

  /** Return the response */
  return BuildResponse(res, 200, {
    success: "error",
    code: 400,
    info: {
      message: "A bad request was made. Try again.",
    },
  });
}

/**
 * Sends a response indicating validation failure along with optional error messages.
 * @param {object} res - The response object.
 * @param {array} errors - Optional array of error messages. Defaults to an empty array.
 * @returns {object} - Response object indicating validation status.
 */
export function ValidationFailed(res, errors = []) {
  if (errors.length > 0) {
    return BuildResponse(res, 200, {
      success: "error",
      code: 400,
      info: {
        message: errors[0],
        errors: errors,
      },
    });
  }

  return BuildResponse(res, 200, {
    success: "ok",
    info: {
      message: "There is no error.",
    },
  });
}
