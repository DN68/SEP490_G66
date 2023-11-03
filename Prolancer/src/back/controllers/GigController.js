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
    console.log('Id '+id)

    Gig.getGigById(id, function (err, gig) {
      console.log('controller')
      if (err)
        res.send(err);
      console.log('res', gig);
      res.send(gig);
    });

  };

}
module.exports = new GigController;