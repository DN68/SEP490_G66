const categoryRoute = require('./category');
const gigRoute = require('./gigs');
function route(app) {
    // app.get("/", function(req,res){
    //     res.send('home');
      
    //   });
    //   app.get("/order", function(req,res){
    //     res.send('order');
      
    //   });  

    app.use("/categories", categoryRoute);  
    app.use("/gigs", gigRoute);  
}

module.exports = route;