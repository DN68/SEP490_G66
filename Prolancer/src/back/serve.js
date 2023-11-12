const express = require('express');
const app = express();
const route = require('../back/routes/index.js');
const bodyParser = require('body-parser');
const cors = require("cors")
const cookieparser = require('cookie-parser')

app.use(cors())

app.use(bodyParser.json());

app.use(cookieparser())

app.use(express.json());
route(app);
app.listen(3000,function(){
  console.log('Serve in host 3000')
});
