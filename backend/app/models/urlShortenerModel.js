module.exports = (sequelize, Sequelize) => {
    const UrlShortener = sequelize.define("url", {
      url: {
        type: Sequelize.STRING,
        required: true
      },
      description: {
        type: Sequelize.STRING,
        required: true
      },
      shortUrl: {
        type: Sequelize.STRING,
        required: true
      },
      fullUrl: {
        type: Sequelize.STRING,
        required: true
      },
      status: {
        type: Sequelize.INTEGER(1),
        default: 1
        //0 - false, 1 - true
      }
    });
  
    return UrlShortener;
  };