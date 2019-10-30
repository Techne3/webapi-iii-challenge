const express = require('express');;

const helmet = require('helmet')

const userRoute = require(`./users/userRouter`)
const server = express();


server.use(logger);
server.use(helmet());
server.use(express.json());

function logger(req, res, next){
  console.log(` ${Date.now() / 1000} ${req.method} to ${req.path} from ${req.url} `);

  next();
}



server.use('/api/users', userRoute)

server.get('/', (req, res) => {
  res.send(`<h2>It's working !!!</h2>`)
});




module.exports = server;
