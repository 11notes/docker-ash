const { nsupdate } = require('/node/bin/nsupdate');

class Router extends require(`/router`){
  constructor(name, express){
    super(name, express);
    this.routes();
  }

  routes(){
    this.router.put(`/${this.name}`, async(req, res, next) =>{
      if(req?.body?.server){
        if(req?.body?.key){
          const key = req.body.key; delete(req.body.key);
          if(req?.body?.commands){
            if(Array.isArray(req.body.commands) && req?.body?.commands.length > 0){
              try{
                await nsupdate(req.body.server, key, req.body.commands);
                res.status(200).json({error:false, result:true});
              }catch(e){
                res.status(400).json({error:true, message:e.toString()});
              }
            }else{
              res.status(400).json({error:true, message:`property: commands must contain at least one command`});
            }
          }else{
            res.status(400).json({error:true, message:`property: commands, can't be empty`});
          }
        }else{
          res.status(400).json({error:true, message:`property: key, can't be empty`});
        }
      }else{
        res.status(400).json({error:true, message:`property: server, can't be empty`});
      }
    });
  }
}

module.exports = Router;