// import all of our backend application source code from the backend dir
const app = require("./backend/app");

// import debugging module for verbose output on failures
const debug = require("debug")("node-angular");

// import http module to create server
const http = require("http");

// whenever we try and setup a port we need to check
// and see if that port number is valid
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// whenever we catch an error trying to configure the server
// locally or otherwise (TODO) we need to try and gracefully
// exit out of our application and print
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// this functor is simply used to log to terminal the port which
// we listening to incase said port is specified by the enviroment
// variable port
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// normalizePort is
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// a server is created from the application which we have defined under backend/
const server = http.createServer(app);

// add 2 aforementioned listeners and start server!
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
