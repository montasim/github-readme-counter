const app = require('./src/app.js');

const port = process.env.port || process.env.PORT;

const server = app.listen(port, async () => {
  try {
    console.info(`Listening to port ${server.address().port}`);
  } catch (error) {
    console.error(`Failed to start server on port ${server.address().port}`);
  }
});
