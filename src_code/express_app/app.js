/** Initialize necessary modules */
import express from "express";
import cors from "cors";

/** Define the express app */
const app = express();

/** Use cors */
app.use(cors());

/** Parse JSON request body */
app.use(express.json());

/** Import routes */
import AuthenticationRoutes from "../src/routes/AuthenticationRoutes.js";

/** Define the port */
const PORT = 5001;

/** Use the routes (Middleware) */
app.use("/api/authentication", AuthenticationRoutes);

/** Start the server */
app.listen(PORT, (err) => {
  if (err) {
    console.error("ERROR STARTING SERVER DUE TO: ", err);
  } else {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}.`);
  }
});

/** Exports the app */
export default app;
