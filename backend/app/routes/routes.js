module.exports = app => {
    const urlShortener = require("../controllers/urlShortenerController");
  
    var router = require("express").Router();
  
    // Create a new short url
    router.post("/create", urlShortener.create);
  
    // Retrieve all short url
    router.get("/all", urlShortener.findAll);
  
    // Update a url with id
    router.put("/update/:id", urlShortener.update);
  
    // Delete a url with id - keep a record
    router.put("/delete/:id", urlShortener.updateDelete);
    
    app.use('/api/urlshortener', router);
  };