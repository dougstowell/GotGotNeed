const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const figlet = require('figlet');

const PORT = process.env.PORT || 9000;

function reportAppStart() {
  figlet('GotGotNeed', function (err, data) {
    if (err) {
      /* eslint-disable no-console */
      console.error('Problem with figlet', err);
      /* eslint-enable no-console */
    }

    /* eslint-disable no-console */
    console.log(data);
    console.log('GGN Application starting on port ' + PORT);
    /* eslint-enable no-console */
  });
}

app.use(cookieParser());

require('./routes/index')(app);

app.listen(PORT, () => {
  reportAppStart();
});
