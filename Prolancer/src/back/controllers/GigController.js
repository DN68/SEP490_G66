const Gig = require('../models/Gig');
class GigController {

getAll = function(req, res) {
    Gig.getAll(function(err, gig) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', gig);
      res.send(gig);
    });
};
getById = function(req, res) {
  var id = req.params.id;

  Gig.getById(id,function(err, gig) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', gig);
    res.send(gig);
  });

};

}
module.exports = new GigController;