const Gig = require('../models/Gig');
const connectDb = require('../common/connectdb.js');

class GigController {

  getGigWithFilterAndPagingAndSearching = function (req, res) {
    const limit = 16;
    var pageQuery = req.query;
    console.log("🚀 ~ file: GigController.js:9 ~ GigController ~ pageQuery:", pageQuery)
    var page;
    var search;
    var filterByCategory = '';
    var filterByDeliveryDay = '';
    var filterByPrice = '';

    if (pageQuery.filterBy1 != ''&&pageQuery.filterBy1 != null) {
      filterByCategory = pageQuery.filterBy1;
      console.log('filterBy1');

    }
    if (pageQuery.filterBy2 != ''&&pageQuery.filterBy1 != null&&pageQuery.filterBy2 != 'Anytime') {
      filterByDeliveryDay = pageQuery.filterBy2;
      console.log('filterBy2');

    }
    if (pageQuery.filterBy3 != ''&&pageQuery.filterBy1 != null) {
      filterByPrice = pageQuery.filterBy3;
      console.log('filterBy3');

    }

    if (pageQuery.search != null) {
      console.log('search here');

      search = pageQuery.search;
    } else {
      search = '';
    }
    console.log(search);

    if (pageQuery.page != null) {
      page = pageQuery.page;
    } else {
      page = 1;
    }
    console.log(page);

    const offset = (page - 1) * limit;
    console.log(offset);
    let gig, totalPage;

    // Create a Promise to handle the asynchronous operation
    const fetchData = new Promise((resolve, reject) => {
      Gig.getGigWithFilterAndPagingAndSearching(filterByCategory, filterByDeliveryDay, filterByPrice, search, limit, offset, function (gigData) {
        gig = gigData;
        if (totalPage !== undefined) {
          resolve();
        }
      }, function (totalPageData) {
        totalPage = totalPageData;
        if (gig !== undefined) {
          console.log(totalPage[0].count)

          resolve();
        }
      });
    });

    fetchData.then(() => {
      // Both callbacks have been called, so you can send the response now.
      res.send({
        gig, pagination: {
          totalPage: Math.ceil(totalPage[0].count / 16),
          page: page
        }, searchQuery: {
          search: search,
          filterBy1: filterByCategory,
          filterBy2: filterByDeliveryDay,
          filterBy3: filterByPrice
        }
      });
    }).catch(error => {
      console.error(error);
      res.status(500).send("An error occurred");
    });


  };

  getGigById = function (req, res) {
    var id = req.params.id;

    Gig.getGigById(id, function (err, gig) {
      if (err)
        res.send(err);
      res.send(gig);
    });

  };


  createGig = function (req, res){
    const Title = req.body.Title
    const Description = req.body.Description
    const Gig_IMG = req.body.Gig_IMG
    const Price = req.body.Price
    const Delivery_Day = req.body.Delivery_Day
    const FreelancerID = req.body.FreelancerID
    const CategoryID = req.body.CategoryID
    const Numberpage = req.body.Numberpage
    Gig.createGig(Title, Description, Gig_IMG, Price, Delivery_Day, FreelancerID, CategoryID, Numberpage, function(err, result){
      if (err) {
        res.send(err);
    } else {
        res.json(result);
    }
    })
  }
}
module.exports = new GigController;