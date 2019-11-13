require('dotenv').config()

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./source/users/auth-router');
const usersRouter = require('./source/users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

const port = process.env.PORT || 4500
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));