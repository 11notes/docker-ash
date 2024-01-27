const fs = require('fs');
const { Express } = require('/express');
const express = require('express');
const { elevenLogJSON } = require('/util');

class Ash{
  #auth;
  #app;

  constructor(){
    this.#app = new Express();

    this.#app.express.get('/ping', (req, res, next) =>{
      res.status(200).end();
    });

    switch(true){
      case process.env?.ASH_AUTH_BASIC:
          this.#auth = process.env?.ASH_AUTH_BASIC;
        break;
      case process.env?.ASH_AUTH_TOKEN:
          this.#auth = process.env?.ASH_AUTH_TOKEN;
        break;
      default:
        this.#auth = `ash:${(Math.random() + 1).toString(16).substring(5)}`;
        elevenLogJSON('WARNING', `no authentication was set! fall back to basic authentication with credentials [${this.#auth}]`);
    }

    this.#app.express.use((req, res, next) => {
      if(req.headers?.authorization){
        let authenticated = false;
        switch(true){
          case /Bearer \S+/i.test(req.headers.authorization):
            if(process.env?.ASH_AUTH_TOKEN && req.headers.authorization.match(new RegExp(`Bearer ${this.#auth}`, 'i'))){
              authenticated = true;
            }
          break;

          default:
            if(/Basic \S+/i.test(req.headers.authorization)){
              if(req.headers.authorization.match(new RegExp(`Basic ${Buffer.from(this.#auth).toString('base64')}`, 'i'))){
                authenticated = true;
              }
            }
        }
        if(authenticated){
          next();
        }else{
          res.status(403).json({error:true, message:'authentication required'});
        }
      }else{
        res.setHeader('WWW-Authenticate', 'Basic realm="ash"').status(401).end();
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

new Ash().start();