/** Initialize neccessary modules */
const ResponseBuilderServices = require("../services/response_builder/ResponseBuilder");

/** Exports the modules */
module.exports = {
  BuildResponse: ResponseBuilderServices.BuildResponse,
  CreateSuccessful: ResponseBuilderServices.CreateSuccessful,
  UpdateSuccessful: ResponseBuilderServices.UpdateSuccessful,
  DeleteSuccessful: ResponseBuilderServices.DeleteSuccessful,
  GetSuccessful: ResponseBuilderServices.GetSuccessful,
  MissingContent: ResponseBuilderServices.MissingContent,
  NotFound: ResponseBuilderServices.NotFound,
  ServerError: ResponseBuilderServices.ServerError,
  BadRequest: ResponseBuilderServices.BadRequest,
};
