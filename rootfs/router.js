const { elevenLogJSON } = require('/util');

class DefaultRouter{
  name;
  router;

  constructor(name, express){
    this.name = name;
    this.router = express.Router();
    elevenLogJSON('INFO', `router ${name} created`);
  }
}

module.exports = DefaultRouter;