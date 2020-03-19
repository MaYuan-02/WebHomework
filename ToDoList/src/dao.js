const fs = require("fs");

exports.asyncReadFile = function(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, 'utf-8', function(err, data){
            if(err){
                reject(err);
            }
            resolve(data);
        })
    }).catch((err) => {
        return err;
    })
}

exports.asyncWriteFile = function(string, path){
    return new Promise(function(resolve, reject){
        fs.writeFile(path, string, function(err){
            reject(err);
        })
    }).catch((err) => {
        return err;
    })
}