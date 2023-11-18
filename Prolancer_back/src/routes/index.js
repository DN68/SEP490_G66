const categoryRoute = require('./category');
const gigRoute = require('./gigs');
const orderRoute = require('./orders');
const userRoute = require('./users')
const  cvRoute = require('./cv')
const  skillRoute = require('./skills')
function route(app) {
    // app.get("/", function(req,res){
    //     res.send('home');
      
    //   });    
    //   app.get("/order", function(req,res){
    //     res.send('order');
      
    //   });  

    app.use("/categories", categoryRoute);  
    app.use("/gigs", gigRoute);  
    app.use("/orders", orderRoute);  
    app.use("/users", userRoute);  
    app.use("/cv", cvRoute);  
    app.use("/skills", skillRoute);  
}

module.exports = route;