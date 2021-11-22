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
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Typescript node starter",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ["./src/controllers/**/**.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", serve, setup(swaggerSpec));

// Setting up 404 handling
app.use((_, response: Response) => {
  return response.status(200).jsonp({
    message: "Node starter apis",
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on port ${port}!`);
});
