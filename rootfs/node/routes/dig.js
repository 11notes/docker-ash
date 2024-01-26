const { nsupdate } = require('/node/bin/dig');

class Router extends require(`/router`){
  constructor(name, express){
    super(name, express);
    this.routes();
  }

  routes(){
    this.router.get(`/${this.name}`, async(req, res, next) =>{
      if(req?.body?.resolver){
        if(req?.body?.type){
          if(req?.body?.record){
            const dig = await dig(req.body.resolver, req.body.type, req.body.record);
            res.status(200).json({error:false, result:dig});
          }else{
            res.status(400).json({error:true, message:`property: record, can't be empty`});
          }
        }else{
          res.status(400).json({error:true, message:`property: type, can't be empty`});
        }
      }else{
        res.status(400).json({error:true, message:`property: resolver, can't be empty`});
      }
    });
  }
}

module.exports = Router;