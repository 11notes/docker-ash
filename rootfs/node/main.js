const fs = require('fs');
const { Express } = require('/express');
const express = require('express');

class NSUPDATE{
  #auth = (process.env?.NSUPDATE_AUTH_BASIC || 'nsupdate:nsupdate');
  #app;

  constructor(){
    this.#app = new Express();

    this.#app.express.get('/ping', (req, res, next) =>{
      res.status(200).end();
    });

    this.#app.express.use((req, res, next) => {
      if(req.headers?.authorization){
        const authorization = req.headers?.authorization.split(' ');
        if(Array.isArray(authorization) && authorization.length > 0){
          const auth = Buffer.from(authorization[1], 'base64').toString().split(':');
          if(this.#auth === auth.join(':')){
            next();
          }else{
            res.status(403).end();
          }
        }
      }else{
        res.setHeader('WWW-Authenticate', 'Basic realm="express"').status(401).end();
      }
    });
  }

  start(){
    this.#routes(`/node/routes`);
    this.#app.start();
  }

  #routes(path){
    const files = fs.readdirSync(path);
    for(const file of files){
      const filePath = `${path}/${file}`;
      const fileStats = fs.statSync(filePath);
      if(fileStats.isDirectory()){
        this.#routes(filePath);
      }else{
        const a = filePath.split('/');
        const route = new (require(filePath))(a[a.length - 1].match(/(\w+).js$/i)[1], express);
        this.#app.express.use(route.router);
      }
    }
  }
}

new NSUPDATE().start();