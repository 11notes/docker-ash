const { nsupdate } = require('/node/bin/dig');

class Router extends require(`/router`){
  constructor(name, express){
    super(name, express);
    this.routes();
  }

  routes(){
    this.router.get(`/${this.name}`, async(req, res, next) =>{
      if(req?.body?.command){
        try{
          const dig = await dig(req.body.command);
          res.status(200).json({error:false, result:dig});
        }catch(e){
          res.status(400).json({error:true, message:e.toString()});
        }
      }else{
        res.status(400).json({error:true, message:`property: command, can't be empty`});
      }
    });
  }
}

module.exports = Router;