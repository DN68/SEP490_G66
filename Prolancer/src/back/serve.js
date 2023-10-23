const express = require('express')
const app = express();
const route = require('../back/routes/index.js')


app.use(express.json());
route(app);
app.listen(3000,function(){
  console.log('Serve in host 3000')
});
