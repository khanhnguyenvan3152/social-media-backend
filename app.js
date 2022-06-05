var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http')
var db = require('./models/db')
var cors = require('cors')
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var cloudinary = require('./utils/cloudinary')
const appSchema = require('./graphql/schema')
const appResolver = require('./graphql/resolvers')
var resolvers = require('./graphql/resolvers')
var context = require('./graphql/context')
const Models = require('./models')
const { createApolloServer } = require('./utils/apollo-server')
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { graphqlUploadExpress } = require('graphql-upload');
const {SubscriptionServer} = require('subscriptions-transport-ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const {execute,subscribe} = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({typeDefs:appSchema,resolvers:appResolver})
  // Creating the WebSocket server
  const subscriptionServer =  SubscriptionServer.create(
    {
      schema,execute,subscribe
    }
    ,
    {
      server: httpServer,
      path: '/graphql'
    })

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.

  const server = createApolloServer(schema, resolvers, [{
    async serverWillStart() {
      return {
        async drainServer() {
           subscriptionServer.close();
        },
      };
    },
  },
    ApolloServerPluginLandingPageGraphQLPlayground,
  ]);
  server.subscriptions
  await server.start()
  app.use(graphqlUploadExpress())
  server.applyMiddleware({ app: app })

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
  }))
  app.use(graphqlUploadExpress())
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/api/v1', apiRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  //Connect to database and initialize graphQL server
  db();

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  httpServer.listen({ port: 3000 }, () => {
    console.log('Server is listening on port 3000.')
  })
}
startServer()



function normalizePort(val) {
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
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


