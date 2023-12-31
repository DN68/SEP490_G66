const express = require('express');
const app = express();
const route = require('./src/routes/index');
const bodyParser = require('body-parser');
const cors = require("cors")
const fileUpload = require('express-fileupload');
app.use(fileUpload({
}));

app.use(bodyParser.json());

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
route(app);
app.listen(3000,function(){
  console.log('Serve in host 3000')
});
