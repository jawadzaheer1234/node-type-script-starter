import { config } from "dotenv";
config();

//Loading and registering absolute paths
import { register } from "tsconfig-paths";
import { compilerOptions } from "./tsconfig.json";
import { join } from "path";

//Setting up absolute paths
const baseUrl = join(__dirname, "src");

register({
  baseUrl,
  paths: compilerOptions.paths,
});

//Setting up express

import express, { Application, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 3000;

// Body Parser
import { json, urlencoded } from "body-parser";
app.use(json()); // support json encoded bodies
app.use(urlencoded({ extended: true })); // support encoded bodies

//Swagger Express Middleware
import * as SwaggerExpress from "swagger-express-mw";
const swaggerConfig: SwaggerExpress.Config = {
  appRoot: __dirname,
  validateResponse: true,
  swaggerFile: `${__dirname}/docs/swagger.yaml`,
};

SwaggerExpress.create(swaggerConfig, (err, middleware) => {
  if (err) {
    console.log({ err });
    throw err; // or handle error
  }

  middleware.register(app);
  // install response validation listener (this will only be called if there actually are any errors or warnings)
  middleware.runner.on(
    "responseValidationError",
    function (validationResponse, request, response) {
      // log your validationResponse here...
      console.error(validationResponse.errors);
    }
  );

  const port = process.env.PORT || 10010;

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App started on port ${port}!`);
  });
});

// connecting to database
import { sequelize } from "~/models";
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();

//Setting up swagger docs
import { serve, setup } from "swagger-ui-express";
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");
import { userRouter, taskRouter } from "~/routes";
app.use("/docs", serve, setup(swaggerDocument));
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
// Setting up 404 handling
app.use((_, response: Response) => {
  return response.status(200).jsonp({
    message: "Node starter apis",
  });
});
