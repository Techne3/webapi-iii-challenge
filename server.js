const express = require('express');;

const helmet = require('helmet')

const userRoute = require(`./users/userRouter`)
const postsRouter = require('./posts/postRouter');


const server = express();
server.use(logger);
server.use(helmet());
server.use(express.json());

function logger(req, res, next){
  console.log(` [${new Date().toISOString()}] ${req.method} to ${req.path} from ${req.url} `);

  next();
}



server.use('/api/users', userRoute)
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>It's working !!!</h2>`)
});




module.exports = server;
