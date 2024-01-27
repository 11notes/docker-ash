const { spawn } = require('node:child_process');

exports.dig = async(commands) => {
  return(new Promise((resolve, reject) => {
    const dig = spawn('/usr/bin/dig', (
      (Array.isArray(commands) ? commands : commands.split(' '))
    ));
    const io = {stdout:'', stderr:''};
    dig.stderr.on('data', data => {io.stderr += data.toString()});
    dig.stdout.on('data', data => {io.stdout += data.toString()});
    dig.on('error', error => {reject(error)});
    dig.on('close', code =>{
      switch(true){
        case /no servers could be reached/ig.test(io.stdout): io.stderr += io.stdout; break;
      }
      if(code === 0){
        if(io.stderr.length > 0){
          reject(io.stderr);
        }else{
          resolve(io.stdout.trim().split(/[\r\n]+/ig));
        }
      }else{
        reject(io.stderr);
      }
    });
  }));
}