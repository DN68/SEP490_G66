const categoryRoute = require('./category');
const gigRoute = require('./gigs');
const orderRoute = require('./orders');
const userRoute = require('./users')
const cvRoute = require('./cv')
const skillRoute = require('./skills')
const orderRequestRoute = require('./orderrequest')
const accountRoute = require('./accounts')
const freelancerRoute = require('./freelancers')
const customerRoute = require('./customers')
const changeRequestRoute = require('./changerequest')
const interviewRoute = require('./interviews')
const deliveryRoute = require('./delivery')
const reviewRoute = require('./review')
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
    app.use("/orderrequest", orderRequestRoute);  
    app.use("/accounts", accountRoute);  
    app.use("/freelancers", freelancerRoute);  
    app.use("/customers", customerRoute);  
    app.use("/changerequest", changeRequestRoute);  
    app.use("/interviews", interviewRoute);  
    app.use("/delivery", deliveryRoute); 
    app.use("/review", reviewRoute); 

}

module.exports = route;