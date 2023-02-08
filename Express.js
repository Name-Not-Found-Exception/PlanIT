const express = require('express');
const app = express();

app.use(express.static('planit/build'));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});