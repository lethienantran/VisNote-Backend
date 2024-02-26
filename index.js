/** This file is for AWS Lambda Handler (NO NEED TO CHANGE ANYTHING) */

/** Initialize necessary module */
import awsServerlessExpress from "aws-serverless-express";
import app from "./src_code/express_app/app";

/** Create the server for AWS Lambda */
const server = awsServerlessExpress.createServer(app);

/** Exports the handler */
export const handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
