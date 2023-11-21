const categoryRoute = require('./category');
const gigRoute = require('./gigs');
const orderRoute = require('./orders');
const userRoute = require('./users')
const accountRoute = require('./accounts')
const freelancerRoute = require('./freelancers')
const customerRoute = require('./customers')

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
    app.use("/accounts", accountRoute);  
    app.use("/freelancers", freelancerRoute);  
    app.use("/customers", customerRoute);  

}

module.exports = route;