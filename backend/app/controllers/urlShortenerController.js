const db = require("../models");
const UrlShortener = db.urlShortener;
const Op = db.Sequelize.Op;

// Function to check if provided url is in valid format
function isValidHttpUrl(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

// Function to create the shortended url
// Generate 18 byte unique id's based on the time, process id and mac address. Works on multiple processes and machines.
function createUniqid(str) {
    const uniqid = require('uniqid');

    return uniqid();
  }

// Create a new short url and save the record into database
exports.create = (req, res) => {
  // step 1 - validate the request by checking whether all information is provided
  if (!req.body.url && !req.body.description) {
    res.status(400).send({
      message: "All information must be provided."
    });
    return;
  }

  // step 2 - check if the provided url is in a valid url format
  if (!isValidHttpUrl(req.body.url)) {
    res.status(400).send({
      message: "Url is not in a valid url format."
    });
    return;
  }

  // step 3 - create and save the record into database
  const shortenUrl = {
    url: req.body.url,
    description: req.body.description,
    shortUrl: createUniqid(),
    fullUrl: 'http://localhost:8080/' + createUniqid(),
    status: 1
  };

  // step 4 - return response to frontend
  UrlShortener.create(shortenUrl)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while creating the url."
      });
    });
};


// Retrieve all url with status = 1 from the database (active urls)
exports.findAll = (req, res) => {
  var condition = { status: 1 };

  UrlShortener.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving urls."
      });
    });
};


// Update a url by the id in the request
exports.update = (req, res) => {
  const shortUrl = createUniqid();

  const id = req.params.id;

  req.body.shortUrl = shortUrl;
  req.body.fullUrl = 'http://localhost:8080/' + shortUrl;

  UrlShortener.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Url was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update url with id=${id}. Url not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating url with id=" + id
      });
    });
};


// Delete a url with the specified id in the request - retain a record
exports.updateDelete = (req, res) => {
  const id = req.params.id;

  req.body.status = 0;

  UrlShortener.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Url was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete url with id=${id}. Url not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting url with id=" + id
      });
    });
};