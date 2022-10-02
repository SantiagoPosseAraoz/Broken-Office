const express = require("express");
const http = require("http");
const app = express();
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");
const client = require("./db");
const cookieparser = require("cookie-parser");
const path = require("path");
//enviroment
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Broken Office Globant",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//middelware

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials:true,
    methods:["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus:200,
    allowedHeaders: [
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Origin",
      "WithCredentials",
      "X-Requested-Wwith",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-HTTP-Method-Override",
      "Set-Cookie",
      "Cookie",
      "Request",
    ], 
  })
  );
  app.use(express.json({ limit: "10mb", extended: true }));
  app.use(
    express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
    );
    app.use(cookieparser());
    app.use(morgan("tiny"));
    
    app.use("/api", routes);
    
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("api working!...");
});

module.exports = server;
