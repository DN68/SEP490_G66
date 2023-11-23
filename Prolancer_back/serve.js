const express = require('express');
const app = express();
const route = require('./src/routes/index');
const bodyParser = require('body-parser');
const cors = require("cors")
const fileUpload = require('express-fileupload');
const cors = require('cors');
app.use(fileUpload({
}));
app.use(cors())

app.use(bodyParser.json());

app.use(express.json());
route(app);
app.listen(3000,function(){
  console.log('Serve in host 3000')
});
app.use(express.urlencoded({extended:true}))
