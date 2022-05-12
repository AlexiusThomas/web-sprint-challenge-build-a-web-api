const express = require('express');
const server = express();
server.use(express.json())

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!




server.use('*', (req, res) => {
    // catch all 404 errors middleware
    res.json({ api: 'up' })
});

server.use((err, req, res, next) => {
  res.status(err.status).json({
      customMessage: 'something went wrong in router',
      message: err.message,
      stack: err.stack
  });

});
  
module.exports = server;
