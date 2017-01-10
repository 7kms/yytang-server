var $api = require('./api');
module.exports = {
     login(paramObj){
        $api.refreshHeader();
        return new Promise((resolve, reject) => {
            $api.post('/login',paramObj)
            .then(data => {
                $api.addHeaderItem({'X-LC-Session':data.sessionToken});
                resolve(data);
            },error => {
                reject(error);
            });
         });
    },
    discover(paramObj){
        return new Promise((resolve, reject) => {
             $api.get('/classes/Entry',paramObj)
            .then(data => {
                resolve(data);
            },error => {
                reject(error);
            });
        });
    },
    subscribe(paramObj){
        return new Promise((resolve, reject) => {
             $api.get('/classes/Subscribe',paramObj)
            .then(data => {
                resolve(data);
            },error => {
                reject(error);
            });
        });
    }
}