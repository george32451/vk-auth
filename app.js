const express = require('express');
const config = require('nconf');
const http = require('http');

const app = express();

config.argv()
  .env()
  .file({ file: 'config.json' });

require('./boot/index')(app);

require('./routes/index')(app);

http.createServer(app).listen(process.env.PORT, () => {
  if (app.get('env') === 'development') {
    console.log(`Express server listening on port ${process.env.PORT}`);
  }
});

