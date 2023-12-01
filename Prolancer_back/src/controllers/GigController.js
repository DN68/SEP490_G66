const Gig = require('../models/Gig');
const connectDb = require('../common/connectdb.js');

class GigController {

  getGigWithFilterAndPagingAndSearching = function (req, res) {
    const limit = 16;
    var pageQuery = req.query;
    console.log("🚀 ~ file: GigController.js:9 ~ GigController ~ pageQuery:", pageQuery)
    var page;
    var status = pageQuery.status;
    var search;
    var filterByCategory = '';
    var filterByDeliveryDay = '';
    var filterByPrice = '';


    if (pageQuery.filterBy1 != '' && pageQuery.filterBy1 != null&&pageQuery.filterBy1 != undefined) {
      filterByCategory = pageQuery.filterBy1;
      console.log('filterByCategory');

    }
    if (pageQuery.filterBy2 != '' && pageQuery.filterBy2 != null && pageQuery.filterBy2 != 'Anytime' && pageQuery.filterBy2 != undefined) {
      filterByDeliveryDay = pageQuery.filterBy2;
      console.log('filterByDeliveryDay');

    }
    if (pageQuery.filterBy3 != '' && pageQuery.filterBy3 != null && pageQuery.filterBy3 != undefined) {
      filterByPrice = pageQuery.filterBy3;
      console.log('filterByPrice');

    }

    if (pageQuery.search != null) {

      search = pageQuery.search;

      console.log('Search here ' + search);

    } else {
      search = '';
    }
    console.log(search);

    if (pageQuery.page != null && pageQuery.page > 0) {
      page = pageQuery.page;
    } else {
      page = 1;
    }
    console.log(page);

    const offset = (page - 1) * limit;
    console.log(offset);
    let gig, totalRows;

    // Create a Promise to handle the asynchronous operation
    const fetchData = new Promise((resolve, reject) => {
      Gig.getGigWithFilterAndPagingAndSearching(status, filterByCategory, filterByDeliveryDay, filterByPrice, search, limit, offset, function (err, gigData) {
        if (err) {

          reject(err);
        } else {
          gig = gigData;
          if (totalRows !== undefined) {
            resolve();
          }

        }
      }, function (err, totalRowsData) {
        if (err) {
          reject(err);
        } else {
          totalRows = totalRowsData;
          if (gig !== undefined) {

            resolve();
          }
        }
      });
    });

    fetchData.then(() => {
      // Both callbacks have been called, so you can send the response now.
      res.send({
        gig, pagination: {
          totalPage: Math.ceil(totalRows[0].count / limit),
          page: parseInt(page),
          totalRow: totalRows[0].count
        }, searchQuery: {
          search: search,
          status: status,
          filterBy1: filterByCategory,
          filterBy2: filterByDeliveryDay,
          filterBy3: filterByPrice
        }
      });
    }, (err) => {
      res.send(err);
    }
    ).catch(error => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
  };

  getGigByFreelancer = function (req, res) {
    const limit = 16;
    var pageQuery = req.query;
    // console.log("🚀 ~ file: GigController.js:9 ~ GigController ~ pageQuery:", pageQuery)
    var page;
    var status = pageQuery.status;
    var search;
    var freelancerId;

    if (pageQuery.freelancerId != '' && pageQuery.freelancerId != null && pageQuery.freelancerId != undefined) {
      freelancerId = pageQuery.freelancerId;
      console.log(freelancerId)
    }

    if (pageQuery.search != null) {

      search = pageQuery.search;

      console.log('Search here ' + search);

    } else {
      search = '';
    }
    console.log(search);

    if (pageQuery.page != null && pageQuery.page > 0) {
      page = pageQuery.page;
    } else {
      page = 1;
    }
    console.log(page);

    const offset = (page - 1) * limit;
    console.log(offset);
    let gig, totalRows;

    // Create a Promise to handle the asynchronous operation
    const fetchData = new Promise((resolve, reject) => {
      Gig.getFreelancerGigWithPagingAndSearching(status, freelancerId, search, limit, offset, function (err, gigData) {
        if (err) {

          reject(err);
        } else {
          gig = gigData;
          if (totalRows !== undefined) {
            resolve();
          }

        }
      }, function (err, totalRowsData) {
        if (err) {
          reject(err);
        } else {
          totalRows = totalRowsData;
          if (gig !== undefined) {

            resolve();
          }
        }
      });
    });

    fetchData.then(() => {
      // Both callbacks have been called, so you can send the response now.
      res.send({
        gig, pagination: {
          totalPage: Math.ceil(totalRows[0].count / limit),
          page: parseInt(page),
          totalRow: totalRows[0].count
        }, searchQuery: {
          search: search,
          status: status,
          freelancerId: freelancerId
        }
      });
    }, (err) => {
      res.send(err);
    }
    ).catch(error => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
  };

  getGigById = function (req, res) {
    var id = req.params.id;
    console.log(id);
    Gig.getGigById(id, function (err, gig) {
      if (err) {
        res.send(err);
      } else {

        res.send(gig[0] ? gig[0] : 'Gig not exist');
      }
    });
  };


  createGig = function (req, res) {
    const Title = req.body.Title
    const Description = req.body.Description
    const Gig_IMG = req.body.Gig_IMG
    const Price = req.body.Price
    const Delivery_Day = req.body.Delivery_Day
    const FreelancerID = req.body.FreelancerID
    const CategoryID = req.body.CategoryID
    const Numberpage = req.body.Numberpage
    Gig.createGig(Title, Description, Gig_IMG, Price, Delivery_Day, FreelancerID, CategoryID, Numberpage, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }


  updateGig = function (req, res) {
    const data = req.body;
    const GigID = req.params.GigID
    Gig.updateGig(data, GigID, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }

  updateGigStatus = function (req, res) {
    const status = req.body.Status;
    const GigID = req.params.GigID
    Gig.updateGigStatus(status, GigID, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }

  changeGigStatus = function (req, res) {
    const data = req.body;
    var status = data.status;
    var gigID = data.gigID;

    console.log(status + gigID);

    Gig.updateGigStatus(status, gigID, function (err, result) {
      if (err)
        return res.send(err);
      else {
        console.log('res', result);
        if (result.affectedRows == 0) {
          res.send({ message: 'Change Status Failed' });

        }
        res.send({ message: 'Change Status Success' });
      }

    });
  }

  getGigByFreelancerIdAndStatus = function (req, res) {
    const id = req.params.FreelancerID;
    const status = req.params.Status
    // console.log(id)
    Gig.getGigByFreelancerId(id, status, function (err, results) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
  }
}
module.exports = new GigController;