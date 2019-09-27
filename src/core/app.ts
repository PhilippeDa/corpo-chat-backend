import express = require('express');
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { usersController, UsersController } from '../controllers/usersController';
import { authorization }from '../middlewares/authorization';
import * as http from 'http';
import * as socketIO from 'socket.io'
import { userSockets } from '../core/sockets'

    const app = express();
    const server = http.createServer(app);
    const io = socketIO(server);
    let socketId = 0;

    app.set('case sensitive routing',true);
    app.disable('x-powered-by');

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        req['timeOfStart'] = new Date();
        next();
    });
      // catch body parser error is failing
      app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(req);
          if (error.status === 400 && error instanceof SyntaxError && 'body' in error) {
              throw new Error('Invalid JSON body')
          } else {
              throw error;
          }
      });
      
  
  
      app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
          if (req['timeOfStart'] ) {
            res.on('finish', () => {
                const now = new Date();
                const msElapsed = now.getMilliseconds() - req['timeOfStart'].getMilliseconds()
                console.log(
                `RequestUrl: ${req.url} \n` +
                `=> End of request handling. It took ${msElapsed} milliseconds \n`
                );
            }); 
          }
          next();
      });

    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    io.on('connection', socket => {
        try{ 
            socketId++;
            socket.emit('connected',{ socketId });
            userSockets[socketId] = { socket: socket , email: null};
        } catch (err) {
            console.log(err);
        }
        io.on('disconnect', socket => {
            try {
                socket.emit('disconnected', {})
            } catch (err) {
                console.log(err);
            }
        })

        io.on('token', data => {

        })
    });

    app.post('/signup', function(req: express.Request, res: express.Response, next: express.NextFunction) {
        usersController.createUser(req,res,next);
    });

    app.post('/login', authorization.login, function(req: express.Request, res: express.Response, next: express.NextFunction) {
        next();
    });

    app.get('/users', authorization.isUserAuthorized, function(req: express.Request, res: express.Response, next: express.NextFunction) {
        usersController.getUsers(req, res, next);
    });

    app.post('/meow', authorization.isUserAuthorized, function(req: express.Request, res: express.Response, next: express.NextFunction){
        res.send(req.body);
    });
  

    server.listen(3001, function(){ 
        const msg = 
        `\n===========================/ secretCorp Chat /===========================\n` + 
        `=== Version ${process.env.npm_package_version}  \n` + 
        `=== API entry point : whatever \n` + 
        `=== Server port : 3001\n` + 
        `=== Environment type : prod -always- \n` + 
        `==================================================================\n\n`; 
        console.log(msg); 
    });